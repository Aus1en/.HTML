<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $username = $_POST['snUser'];
        $password = password_hash($_POST['snPass'], PASSWORD_BCRYPT); // Hash the password for security
        $company = $_POST['snCompany'];
        $acntName = $_POST['snName'];

        // Create a database connection
        $db = new mysqli('localhost', 'snDB', 'accesstodbplease!', 'mysql');

        if ($db->connect_error) {
            die("Connection failed: " . $db->connect_error);
        }

        // Check if the username already exists in the database
        $checkQuery = "SELECT username FROM users WHERE username = ?";
        $stmt = $db->prepare($checkQuery);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $response = array("success" => false, "error" => "User already exists.");
        } else {
            // Insert user data into the database
            $insertQuery = "INSERT INTO users (username, password, company, actname) VALUES (?, ?, ?, ?)";
            $stmt = $db->prepare($insertQuery);
            $stmt->bind_param("ssss", $username, $password, $company , $acntName);

            if ($stmt->execute()) {
                $response = array("success" => true, "head" => "Thanks!", "message" => "You have been signed up.");
            } else {
                $response = array("success" => false, "error" => "Message could not be sent. Mailer Error: " . $mail->ErrorInfo);
            }
        }
        // Set the response header to indicate JSON content
        header("Content-Type: application/json");
        // Output the response as JSON
        echo json_encode($response);

        $stmt->close();
        $db->close();
    }
?>