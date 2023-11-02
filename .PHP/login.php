<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//phpinfo();
session_start();
header("Content-Type: application/json");

$loginMessage = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['lgnUser'];
    $password = $_POST['lgnPass'];

    // Create a database connection
    $db = new mysqli('localhost', 'snDB', 'accesstodbplease!', 'mysql');

    if ($db->connect_error) {
        die("Connection failed: " . $db->connect_error);
    }

    // Retrieve user data from the database
    $sql = "SELECT username, password FROM users WHERE username = ?";
    $stmt = $db->prepare($sql);
    $stmt->bind_param("s", $username);

    if ($stmt->execute()) {
        $stmt->store_result();

        if ($stmt->num_rows == 1) {
            $stmt->bind_result($dbUsername, $dbPassword);
            $stmt->fetch();

            // Verify the entered password against the stored hashed password
            if (password_verify($password, $dbPassword)) {
                // Set a session variable for the authenticated user
                $_SESSION['username'] = $username;
                $response = array("success" => true, "head" => "You got it!", "message" => "We will get back to you shortly.");
                //header("Location: " . $_SERVER['HTTP_REFERER']);
            } else {
                $response = array("success" => false, "error" => "Login Unsuccessful.");
            }
        } else {
            $loginMessage = "User not found.";
        }
    } else {
        $loginMessage = "DB Error: " . $db->error;
    }

    // Set the response header to indicate JSON content
    header("Content-Type: application/json");
    // Output the response as JSON
    echo json_encode($response);

    $stmt->close();
    $db->close();
}
?>