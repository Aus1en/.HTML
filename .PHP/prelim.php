<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//phpinfo();

require '../../vendor/autoload.php'; // Make sure the path to autoload.php is correct

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = isset($_POST["srvName"]) ? $_POST["srvName"] : "Default Name";
    $email = isset($_POST["srvEmail"]) ? $_POST["srvEmail"] : "austen.pacs@gmail.com";
    $phone = isset($_POST["srvPhone"]) ? $_POST["srvPhone"] : "Default Phone";
    $company = isset($_POST["srvCompany"]) ? $_POST["srvCompany"] : "Default Company";

    $srvProcess = isset($_POST["srvProcess"]) ? $_POST["srvProcess"] : "Default Process";
    $srvAutomation = isset($_POST["srvAutomation"]) ? "Yes" : "No";
    $srvSoftware = isset($_POST["srvSoftware"]) ? "Yes" : "No";

    $srvSCADA = isset($_POST["srvSCADA"]) ? "Yes" : "No";
    $srvHMI = isset($_POST["srvHMI"]) ? "Yes" : "No";
    $srvDATA = isset($_POST["srvDATA"]) ? "Yes" : "No";

    $srvgCreation = isset($_POST["srvgCreation"]) ? "Yes" : "No";
    $srvgRevisions = isset($_POST["srvgRevisions"]) ? "Yes" : "No";
    $srvgTrouble = isset($_POST["srvgTrouble"]) ? "Yes" : "No";
    $srvgOther = isset($_POST["srvgOther"]) ? $_POST["srvgOther"] : "N/A";

    $srvpCreation = isset($_POST["srvpCreation"]) ? "Yes" : "No";
    $srvpRevisions = isset($_POST["srvpRevisions"]) ? "Yes" : "No";
    $srvpTrouble = isset($_POST["srvpTrouble"]) ? "Yes" : "No";
    $srvpOther = isset($_POST["srvpOther"]) ? $_POST["srvpOther"] : "N/A";

    $srvgIgnition = isset($_POST["srvgIgnition"]) ? "Yes" : "No";
    $srvgAVEVA = isset($_POST["srvgAVEVA"]) ? "Yes" : "No";
    $srvgRockwell = isset($_POST["srvgRockwell"]) ? "Yes" : "No";
    $srvgOther1 = isset($_POST["srvgOther1"]) ? $_POST["srvgOther1"] : "N/A";

    $srvpRockwell = isset($_POST["srvpRockwell"]) ? "Yes" : "No";
    $srvpSiemens = isset($_POST["srvpSiemens"]) ? "Yes" : "No";
    $srvpDirect = isset($_POST["srvpDirect"]) ? "Yes" : "No";
    $srvpOther1 = isset($_POST["srvpOther1"]) ? $_POST["srvpOther1"] : "N/A";

    $srvConsult = isset($_POST["srvConsult"]) ? "Yes" : "No";
    $srvOnsite = isset($_POST["srvOnsite"]) ? "Yes" : "No";
    $srvRemote = isset($_POST["srvRemote"]) ? "Yes" : "No";
    $srvEngineering = isset($_POST["srvEngineering"]) ? "Yes" : "No";

    // Create a PHPMailer object
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'austen.pacs@gmail.com';
        $mail->Password = 'bkqmmyxvfsebawgx';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom($email, $name);
        $mail->addAddress('austen.pacs@gmail.com');

        $mail->isHTML(true);
        $mail->Subject = "Preliminary Form submission from " . $name;

        $mail->Body = '<html>
            <head>
                <style>
                    .container {
                        font-family: Arial, sans-serif;
                        background-color: #f2f2f2;
                        padding: 20px;
                    }
                    .field {
                        margin-bottom: 10px;
                    }
                    .label {
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Preliminary Form</h1>
                    <div class="field">
                        <span class="label">Name:</span> ' . $name . '
                    </div>
                    <div class="field">
                        <span class="label">Email:</span> ' . $email . '
                    </div>
                    <div class="field">
                        <span class="label">Phone:</span> ' . $phone . '
                    </div>
                    <div class="field">
                        <span class="label">Company:</span> ' . $company . '
                    </div>
                    <div class="field">
                        <span class="label">Most Critical Process:</span> ' . $srvProcess . '
                    </div>
                    <div class="field">
                        <span class="label">Currently Has Automation:</span> ' . $srvAutomation . '
                    </div>
                    <div class="field">
                        <span class="label">Has Software:</span> ' . $srvSoftware . '
                    </div>
                    <div class="field">
                        <span class="label">Looking for Consulting service:</span> ' . $srvConsult . '
                    </div>
                    <div class="field">
                        <span class="label">Looking for Onsite service:</span> ' . $srvOnsite . '
                    </div>
                    <div class="field">
                        <span class="label">Looking for Remote service:</span> ' . $srvRemote . '
                    </div>
                    <div class="field">
                        <span class="label">Looking for Engineering service:</span> ' . $srvEngineering . '
                    </div>
                    <div class="field">
                        <span class="label">------Graphics Design / Databasing------</span>
                    </div>
                    <div class="field">
                        <span class="label">SCADA:</span> ' . $srvSCADA . '
                    </div>
                    <div class="field">
                        <span class="label">HMI/Windows:</span> ' . $srvHMI . '
                    </div>
                    <div class="field">
                        <span class="label">Database:</span> ' . $srvDATA . '
                    </div>
                    <div class="field">
                        <span class="label">Creation:</span> ' . $srvgCreation . '
                    </div>
                    <div class="field">
                        <span class="label">Revisions:</span> ' . $srvgRevisions . '
                    </div>
                    <div class="field">
                        <span class="label">Troubleshooting:</span> ' . $srvgTrouble . '
                    </div>
                    <div class="field">
                        <span class="label">Other:</span> ' . $srvgOther . '
                    </div>
                    <div class="field">
                        <span class="label">-----PLC Programming-----</span>
                    </div>
                    <div class="field">
                        <span class="label">Creation:</span> ' . $srvpCreation . '
                    </div>
                    <div class="field">
                        <span class="label">Revisions:</span> ' . $srvpRevisions . '
                    </div>
                    <div class="field">
                        <span class="label">Troubleshooting:</span> ' . $srvpTrouble . '
                    </div>
                    <div class="field">
                        <span class="label">Other:</span> ' . $srvpOther . '
                    </div>
                    <div class="field">
                        <span class="label">-----Preferred Software-----</span>
                    </div>
                    <div class="field">
                        <span class="label">--Graphics--</span>
                    </div>
                    <div class="field">
                        <span class="label">Ignition:</span> ' . $srvgIgnition . '
                    </div>
                    <div class="field">
                        <span class="label">AVEVA:</span> ' . $srvgAVEVA . '
                    </div>
                    <div class="field">
                        <span class="label">Rockwell:</span> ' . $srvgRockwell . '
                    </div>
                    <div class="field">
                        <span class="label">Other:</span> ' . $srvgOther1 . '
                    </div>
                    <div class="field">
                        <span class="label">--PLC--</span>
                    </div>
                    <div class="field">
                        <span class="label">Rockwell:</span> ' . $srvpRockwell . '
                    </div>
                    <div class="field">
                        <span class="label">Siemens:</span> ' . $srvpSiemens . '
                    </div>
                    <div class="field">
                        <span class="label">AutomationDirect:</span> ' . $srvpDirect . '
                    </div>
                    <div class="field">
                        <span class="label">Other:</span> ' . $srvpOther1 . '
                    </div>
                </div>
            </body>
        </html>';
        // Send the email
        if ($mail->send()) {
            $response = array("success" => true, "head" => "You got it!", "message" => "We will get back to you shortly.");
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