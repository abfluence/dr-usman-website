<?php
/**
 * TEMPORARY diagnostic — delete once config.local.php loads cleanly.
 *
 * Reports why config.local.php fails to parse. It never outputs any value
 * from the file: only lengths, counts and character classes. The token and
 * the email address cannot leak through this.
 *
 * Guarded by a key so it is not a freely crawlable fingerprint of the server.
 */

header('Content-Type: application/json');

if (($_GET['k'] ?? '') !== 'u7f3q2') {
    http_response_code(404);
    exit;
}

$path = __DIR__ . '/config.local.php';
$out  = ['exists' => is_file($path), 'readable' => is_readable($path)];

if (!$out['exists']) {
    echo json_encode($out, JSON_PRETTY_PRINT);
    exit;
}

$raw          = (string)file_get_contents($path);
$out['bytes'] = strlen($raw);
$out['lines'] = substr_count($raw, "\n") + 1;

// Byte-level traps that produce exactly this symptom
$out['starts_with_php_tag'] = substr(ltrim($raw), 0, 5) === '<?php';
$out['utf8_bom']            = substr($raw, 0, 3) === "\xEF\xBB\xBF";
$out['bytes_before_tag']    = strpos($raw, '<?php');
$out['has_closing_tag']     = strpos($raw, '?>') !== false;
$out['crlf_line_endings']   = strpos($raw, "\r\n") !== false;

// Curly/smart quotes — the usual cause when text came via a word processor
foreach ([
    'left_single'  => "\xE2\x80\x98",
    'right_single' => "\xE2\x80\x99",
    'left_double'  => "\xE2\x80\x9C",
    'right_double' => "\xE2\x80\x9D",
    'nbsp'         => "\xC2\xA0",
] as $name => $needle) {
    $n = substr_count($raw, $needle);
    if ($n) { $out['smart_chars'][$name] = $n; }
}

$out['define_count']     = substr_count($raw, 'define(');
$out['straight_quotes']  = substr_count($raw, "'");
$out['semicolons']       = substr_count($raw, ';');

// Which names appear at all (names only — never the values)
foreach (['IG_USER_ID', 'LONG_LIVED_TOKEN', 'ENQUIRY_TO', 'ENQUIRY_FROM'] as $k) {
    $out['mentions'][$k] = substr_count($raw, $k) > 0;
}

// Ask PHP itself. A parse error in an included file is a catchable
// ParseError since PHP 7, so this reports the real message and line.
try {
    include $path;
    $out['parse'] = 'ok';
    foreach (['IG_USER_ID', 'LONG_LIVED_TOKEN', 'ENQUIRY_TO', 'ENQUIRY_FROM'] as $k) {
        $out['defined'][$k] = defined($k) ? ('yes, length ' . strlen(constant($k))) : 'NOT DEFINED';
    }
} catch (\ParseError $e) {
    $out['parse']      = 'PARSE ERROR';
    $out['parse_msg']  = $e->getMessage();
    $out['parse_line'] = $e->getLine();
} catch (\Throwable $e) {
    $out['parse']     = 'ERROR';
    $out['parse_msg'] = $e->getMessage();
}

echo json_encode($out, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
