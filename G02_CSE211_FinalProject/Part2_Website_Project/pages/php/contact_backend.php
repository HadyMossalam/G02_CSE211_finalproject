<?php
// DB CONNECTION
$conn = new mysqli("localhost", "root", "", "events_db");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get & sanitize inputs
$name       = mysqli_real_escape_string($conn, $_POST['name']);
$email      = mysqli_real_escape_string($conn, $_POST['email']);
$phone      = mysqli_real_escape_string($conn, $_POST['phone'] ?? '');
$event_type = mysqli_real_escape_string($conn, $_POST['event-type'] ?? '');
$message    = mysqli_real_escape_string($conn, $_POST['message']);

// Basic validation
if (!$name || !$email || !$message) {
    die("Required fields missing");
}

// Insert into DB
$sql = "INSERT INTO contact_messages 
        (name, email, phone, event_type, message)
        VALUES ('$name','$email','$phone','$event_type','$message')";

if ($conn->query($sql)) {
    echo "<h2 style='text-align:center;margin-top:50px'>
            ✅ Message sent successfully!
          </h2>";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>