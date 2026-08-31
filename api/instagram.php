<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Credentials come from api/config.local.php (untracked, server-only) or the
// environment. Never hard-code them here — this file is public on GitHub.
$cfg = __DIR__ . '/config.local.php';
if (is_readable($cfg)) { require_once $cfg; }

$token  = getenv('LONG_LIVED_TOKEN') ?: (defined('LONG_LIVED_TOKEN') ? LONG_LIVED_TOKEN : '');
$userId = getenv('IG_USER_ID')       ?: (defined('IG_USER_ID')       ? IG_USER_ID       : '');

if (!$token || !$userId) {
    http_response_code(500);
    echo json_encode(['error' => 'Missing IG_USER_ID or LONG_LIVED_TOKEN']);
    exit;
}

// File-based cache — 15 minutes
$cacheFile = __DIR__ . '/ig_cache.json';
$cacheTtl  = 15 * 60;

if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < $cacheTtl) {
    $cached = file_get_contents($cacheFile);
    if ($cached) {
        echo json_encode(['source' => 'cache', 'data' => json_decode($cached)]);
        exit;
    }
}

$fields = 'id,media_url,thumbnail_url,permalink,caption,timestamp,media_type';
$apiUrl = "https://graph.facebook.com/v22.0/{$userId}/media?fields={$fields}&limit=6&access_token={$token}";

$response = false;
$httpCode = 0;
$transport = null;
$curlErr   = null;

if (function_exists('curl_init')) {
    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 20);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'drusmanpk-site/1.0');
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($response === false) {
        $curlErr = curl_errno($ch) . ': ' . curl_error($ch);
    } else {
        $transport = 'curl';
    }
    curl_close($ch);
}

// Some shared hosts block or misconfigure cURL. Fall back to a stream request.
if ($response === false && ini_get('allow_url_fopen')) {
    $ctx = stream_context_create(['http' => [
        'method'  => 'GET',
        'timeout' => 20,
        'header'  => "User-Agent: drusmanpk-site/1.0\r\n",
        'ignore_errors' => true,
    ]]);
    $response = @file_get_contents($apiUrl, false, $ctx);
    if ($response !== false) {
        $transport = 'stream';
        if (isset($http_response_header[0]) &&
            preg_match('{HTTP/\S+\s+(\d{3})}', $http_response_header[0], $m)) {
            $httpCode = (int) $m[1];
        } else {
            $httpCode = 200;
        }
    }
}

if ($response === false) {
    http_response_code(502);
    // curl_error never contains the token; the URL is deliberately not echoed.
    echo json_encode([
        'error'          => 'Failed to reach Instagram API',
        'curl_error'     => $curlErr,
        'curl_available' => function_exists('curl_init'),
        'allow_url_fopen'=> (bool) ini_get('allow_url_fopen'),
        'openssl'        => extension_loaded('openssl'),
    ]);
    exit;
}

$json = json_decode($response, true);

if ($httpCode !== 200 || isset($json['error'])) {
    http_response_code($httpCode ?: 500);
    echo json_encode(['error' => $json['error']['message'] ?? 'Instagram API error']);
    exit;
}

$data = array_map(function ($post) {
    $rawUrl = ($post['media_type'] === 'VIDEO')
        ? ($post['thumbnail_url'] ?? '')
        : ($post['media_url'] ?? '');
    return [
        'id'          => $post['id'],
        'media_type'  => $post['media_type'],
        'display_url' => $rawUrl ? '/api/ig-image?url=' . urlencode($rawUrl) : '',
        'permalink'   => $post['permalink'],
        'caption'     => $post['caption'] ?? '',
        'timestamp'   => $post['timestamp'],
    ];
}, $json['data'] ?? []);

file_put_contents($cacheFile, json_encode($data));

echo json_encode(['source' => 'api', 'data' => $data]);
