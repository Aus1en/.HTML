<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//phpinfo();
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (isset($_POST['restart'])) {
    $output = shell_exec('sudo service apache2 restart');
    echo "<pre>$output</pre>";
}
?>