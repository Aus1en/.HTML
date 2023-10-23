<?php
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Hash the password for security

    // Create a database connection
    $db = new mysqli('localhost', 'db_username', 'db_password', 'mydatabase');

    if ($db->connect_error) {
        die("Connection failed: " . $db->connect_error);
    }

    // Insert user data into the database
    $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    $stmt = $db->prepare($sql);
    $stmt->bind_param("ss", $username, $password);

    if ($stmt->execute()) {
        echo "User registered successfully.";
    } else {
        echo "Error: " . $db->error;
    }

    $stmt->close();
    $db->close();
?>