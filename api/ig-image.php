<?php
$allowedHosts = ['cdninstagram.com', 'fbcdn.net'];

function isAllowed(string $url, array $allowedHosts): bool {
    $parsed = parse_url($url);
    if (!$parsed || empty($parsed['host'])) return false;
    $hostname = strtolower($parsed['host']);
    foreach ($allowedHosts as $h) {
        if ($hostname === $h || substr($hostname, -(strlen($h) + 1)) === '.' . $h) {
            return true;
        }
    }
    return false;
}

$url = $_GET['url'] ?? '';

if (!$url || !isAllowed($url, $allowedHosts)) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid or disallowed URL']);
    exit;
}

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible)');
$imageData = curl_exec($ch);
$httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
curl_close($ch);

if (!$imageData || $httpCode !== 200) {
    http_response_code($httpCode ?: 502);
    exit;
}

header('Content-Type: ' . ($contentType ?: 'image/jpeg'));
header('Cache-Control: public, max-age=86400');
header('Access-Control-Allow-Origin: *');
echo $imageData;
