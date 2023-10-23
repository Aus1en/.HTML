<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//phpinfo();
session_start();

// Set the session timeout to 30 minutes (1800 seconds)
$sessionTimeout = 300;

// Check if the session variable 'username' is set and hasn't expired
if (isset($_SESSION['username']) && (time() - $_SESSION['last_activity']) <= $sessionTimeout) {
    // Update the last activity time to the current time
    $_SESSION['last_activity'] = time();
    echo $_SESSION['username'];
} else {
    // If the session has expired or 'username' is not set, start a new session
    session_destroy();
    session_start();
    echo "";
}

// You can also set the 'last_activity' time when the session is first created
if (!isset($_SESSION['last_activity'])) {
    $_SESSION['last_activity'] = time();
}
?>