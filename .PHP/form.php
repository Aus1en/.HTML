<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//phpinfo();
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);

require '../../vendor/autoload.php'; // Make sure the path to autoload.php is correct

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Create a PHPMailer object
    $mail = new PHPMailer(true);

    try {
        // Gmail SMTP server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'austen.pacs@gmail.com'; // Your Gmail email address
        $mail->Password = 'bkqmmyxvfsebawgx'; // The App Password you generated
        $mail->SMTPSecure = 'tls'; //ssl tls
        $mail->Port = 587; //587 465

        // Sender and recipient information
        $mail->setFrom($email); // Replace 'Your Name' with the sender's name
        $mail->addAddress('austen.pacs@gmail.com'); // The recipient's email address

        // Email content
        $mail->isHTML(false);
        $mail->Subject = "Contact Form Submission from " . $name;
        $mail->Body = "Name: " . $name . "\nEmail: " . $email . "\nMessage:\n" . $message;

        if ($mail->send()) {
            $response = array("success" => true, "head" => "Successful!", "message" => "We will get back to you within 24 hours.");
        } else {
            $response = array("success" => false, "error" => "Message could not be sent. Mailer Error: " . $mail->ErrorInfo);
        }
        // Set the response header to indicate JSON content
        header("Content-Type: application/json");
        // Output the response as JSON
        echo json_encode($response);
    } catch (Exception $e) {
        echo "Message could not be sent. Exception: " . $e->getMessage();
    }
}
?>