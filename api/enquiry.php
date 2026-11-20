<?php
/**
 * Contact-form enquiry handler.
 *
 * The form still opens WhatsApp afterwards — this runs first so the enquiry
 * is recorded even when the patient never presses send in WhatsApp, which
 * was previously losing every one of those leads.
 *
 * Recipient and From address come from api/config.local.php (untracked,
 * server-only), same as the Instagram credentials:
 *   define('ENQUIRY_TO',   'someone@example.com');
 *   define('ENQUIRY_FROM', 'website@drusmanpk.com');
 */

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$cfg = __DIR__ . '/config.local.php';
if (is_readable($cfg)) { require_once $cfg; }

$to   = getenv('ENQUIRY_TO')   ?: (defined('ENQUIRY_TO')   ? ENQUIRY_TO   : '');
$from = getenv('ENQUIRY_FROM') ?: (defined('ENQUIRY_FROM') ? ENQUIRY_FROM : 'website@drusmanpk.com');

if (!$to) {
    // Misconfigured server. Say nothing useful publicly; the form falls back
    // to WhatsApp on the client either way.
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Not configured']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true) ?: $_POST;

/** Strip CR/LF so a field value can never inject extra mail headers. */
function clean($v, $max = 400) {
    $v = is_string($v) ? $v : '';
    $v = str_replace(["\r", "\n", "\0"], ' ', $v);
    return mb_substr(trim($v), 0, $max);
}

// Bots fill in every field they find, including one that is hidden from
// people. A filled honeypot gets the same "ok" a real submit does, so the
// bot has no signal to retry with.
if (clean($body['website'] ?? '') !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

$name      = clean($body['name']      ?? '', 120);
$phone     = clean($body['phone']     ?? '', 40);
$email     = clean($body['email']     ?? '', 160);
$procedure = clean($body['procedure'] ?? '', 80);
$datetime  = clean($body['datetime']  ?? '', 80);
$message   = mb_substr(trim((string)($body['message'] ?? '')), 0, 3000);
$message   = str_replace(["\r\n", "\r"], "\n", $message);

if ($name === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Name is required']);
    exit;
}

// Crude per-IP throttle: one submit per 30s, so a script cannot flood the
// inbox. sys_get_temp_dir() is writable on Hostinger shared hosting.
$ip    = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$stamp = sys_get_temp_dir() . '/enq_' . sha1($ip);
if (is_file($stamp) && (time() - filemtime($stamp)) < 30) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'Too many requests']);
    exit;
}
@touch($stamp);

$lines = ["New enquiry from drusmanpk.com", str_repeat('-', 34), "Name: $name"];
if ($phone)     { $lines[] = "Phone: $phone"; }
if ($email)     { $lines[] = "Email: $email"; }
if ($procedure) { $lines[] = "Procedure: $procedure"; }
if ($datetime)  { $lines[] = "Requested appointment: $datetime"; }
if ($message)   { $lines[] = "\nMessage:\n$message"; }
$lines[] = "\n" . str_repeat('-', 34);
$lines[] = 'Submitted: ' . gmdate('Y-m-d H:i') . ' UTC';
$lines[] = 'Language: ' . clean($body['lang'] ?? '', 8);

$headers = [
    'From: Dr. Usman Website <' . $from . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];
// Only trust the address as Reply-To once it actually parses as one.
if ($email && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $headers[] = 'Reply-To: ' . $email;
}

$subject = '=?UTF-8?B?' . base64_encode('New enquiry — ' . $name . ($procedure ? " ($procedure)" : '')) . '?=';
$sent = @mail($to, $subject, implode("\n", $lines), implode("\r\n", $headers));

if (!$sent) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Could not send']);
    exit;
}

echo json_encode(['ok' => true]);
