<?php
/**
 * Shared credential loader.
 *
 * Three sources, in order of preference:
 *   1. api/config.local.ini  — plain KEY=value, no quotes, no PHP syntax.
 *   2. api/config.local.php  — the older define() file, still supported.
 *   3. environment variables.
 *
 * The .ini form exists because the PHP form is edited by hand in a web file
 * manager, and a single curly quote from a clipboard makes the whole site's
 * API die with a blank 500 that is invisible from outside. parse_ini_file()
 * cannot fatal that way: a malformed line is skipped, not fatal.
 *
 * Both local files are untracked and denied by .htaccess.
 */

if (!function_exists('dr_usman_config')) {

    function dr_usman_config(string $key, string $default = ''): string
    {
        static $ini = null;

        if ($ini === null) {
            $ini  = [];
            $path = __DIR__ . '/config.local.ini';
            if (is_readable($path)) {
                $parsed = @parse_ini_file($path, false, INI_SCANNER_RAW);
                if (is_array($parsed)) {
                    foreach ($parsed as $k => $v) {
                        // Tolerate values someone wrapped in quotes anyway,
                        // straight or curly, plus stray whitespace.
                        $v = trim((string)$v);
                        $v = trim($v, "'\"\u{2018}\u{2019}\u{201C}\u{201D}");
                        $ini[strtoupper(trim($k))] = trim($v);
                    }
                }
            }

            // Legacy PHP config. A parse error here is catchable, so a broken
            // file degrades to "credential missing" instead of killing the
            // request with no message.
            $legacy = __DIR__ . '/config.local.php';
            if (is_readable($legacy)) {
                try {
                    require_once $legacy;
                } catch (\Throwable $e) {
                    error_log('config.local.php could not be parsed: ' . $e->getMessage());
                }
            }
        }

        if (isset($ini[$key]) && $ini[$key] !== '') {
            return $ini[$key];
        }
        $env = getenv($key);
        if ($env !== false && $env !== '') {
            return $env;
        }
        if (defined($key)) {
            return (string)constant($key);
        }
        return $default;
    }
}
