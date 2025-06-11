<?php

// Variables
$version = '3.1';
$modificationDate = '2024-06-27';

$appURL = 'https://www.picdrop.com';
$domainUuid = '9d199bac46efa36e359ef61289f4c668';
$title = 'niklasthran';

$request = empty($_GET['r']) ? '' : $_GET['r'];
$webIntURL = null;

/* assemble webintegration URL (Apache) */
$host = empty($_SERVER['HTTP_HOST']) ? null : $_SERVER['HTTP_HOST'];

if ($host !== null) {
    $relPath = null;

    if (!empty($_SERVER["REQUEST_URI"])) {
        $dirPath = str_replace('\\', '/', __DIR__);
        $dirPathElements = explode('/', trim($dirPath, '/'));
        $pathElements = explode('/', trim($_SERVER["REQUEST_URI"], '/'));
        $relPathElements = array();

        if (empty($pathElements)) {
            $relPath = '';
        } else {
            $peCur = 0;
            for ($i = 0, $c = count($dirPathElements); $i < $c; $i++) {
                if (!array_key_exists($peCur, $pathElements)) {
                    continue;
                }

                if ($dirPathElements[$i] === $pathElements[$peCur]) {
                    $relPathElements[] = $dirPathElements[$i];
                    $peCur++;
                }
            }

            $relPath = implode('/', $relPathElements);
        }
    }

    if ($relPath !== null) {
        $webIntURL = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . trim($host . '/' . $relPath, '/');
    }
}

/* debug mode */
if (isset($_GET['debug'])) {
    echo implode("\n", array(
        '<pre>',
        sprintf("version: %s (%s)", $version, $modificationDate),
        'app url: ' . $appURL,
        'domain uuid: ' . $domainUuid,
        'htaccess file: ' . (is_file(__DIR__ . '/.htaccess') ? 'exists' : 'missing'),
        'server software: ' . (isset($_ENV["SERVER_SOFTWARE"]) ? $_ENV["SERVER_SOFTWARE"] : 'unavailable'),
        'mod_rewrite: ' . (function_exists('apache_get_modules') ? (in_array(
            'mod_rewrite',
            apache_get_modules()
        ) ? 'available' : 'not_available') : 'module check unavailable'),
        '</pre>',
    ));

    exit(0);
}

/* shorten request by prefix */
if (!empty($_GET['pre'])) {
    $prefix = $_GET['pre'];

    if (strncmp($request, $prefix, strlen($prefix)) === 0) {
        $request = ltrim(substr($request, strlen($prefix)), '/');
    }
}

/* assemble query params */
$queryParams = $_GET;

if (isset($queryParams['r'])) {
    unset($queryParams['r']);
}

if (isset($queryParams['pre'])) {
    unset($queryParams['pre']);
}

if ($webIntURL !== null) {
    $queryParams['wi'] = $webIntURL;
}

$queryParams['version'] = $version;

$requestPath = '';
if ($request !== '') {
    $requestPath = '/' . $request;
}

/* assemble target url */
$targetUrl = $appURL . '/wf/' . $domainUuid . $requestPath . (empty($queryParams) ? '' : '?' . http_build_query($queryParams));
header('Location: ' . $targetUrl, true, 301);

