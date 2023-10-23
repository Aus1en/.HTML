<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//phpinfo();
session_start();
header("Content-Type: application/json");

$loginSuccess = false;
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
                $loginSuccess = true;
                $loginMessage = "Login successful.";
                $_SESSION['showPopup'] = true;
                header("Location: " . $_SERVER['HTTP_REFERER']);
            } else {
                $loginMessage = "Invalid password.";
            }
        } else {
            $loginMessage = "User not found.";
        }
    } else {
        $loginMessage = "Error: " . $db->error;
    }

    $stmt->close();
    $db->close();
}

// Return JSON response for JavaScript
$response = [
    'success' => $loginSuccess,
    'message' => $loginMessage,
];

echo json_encode($response);
?>