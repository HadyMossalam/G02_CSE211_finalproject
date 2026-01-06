<?php
// ===============================
// DB CONNECTION
// ===============================
$conn = new mysqli("localhost", "root", "", "events_db");
if ($conn->connect_error) {
    die("Database connection failed");
}

// ===============================
// CHECK REQUEST
// ===============================
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Invalid request");
}

// ===============================
// COLLECT & SANITIZE INPUT
// ===============================
$first_name  = trim($_POST["first_name"] ?? "");
$last_name   = trim($_POST["last_name"] ?? "");
$email       = trim($_POST["email"] ?? "");
$phone       = trim($_POST["phone"] ?? "");
$event_type  = trim($_POST["event_type"] ?? "");
$event_date  = $_POST["event_date"] ?? null;
$guest_count = (int) ($_POST["guest_count"] ?? 0);
$budget      = (float) ($_POST["budget"] ?? 0);
$location    = trim($_POST["location"] ?? "");
$message     = trim($_POST["message"] ?? "");

// services[] comes as ARRAY → convert to string
$services = "";
if (!empty($_POST["services"]) && is_array($_POST["services"])) {
    $services = implode(", ", $_POST["services"]);
}

if (
    empty($first_name) ||
    empty($last_name) ||
    empty($email) ||
    empty($event_type) ||
    empty($event_date)
) {
    die("Missing required fields");
}

$today = date("Y-m-d");

if (strtotime($event_date) < strtotime($today)) {
    die(" You cannot select a date before today.");
}

$sql = "
    INSERT INTO registrations
    (first_name, last_name, email, phone, event_type, event_date, guest_count, budget, location, services, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    die("Prepare failed");
}

$stmt->bind_param(
  "ssssssidsss",
  $first_name,
  $last_name,
  $email,
  $phone,
  $event_type,
  $event_date,
  $guest_count,
  $budget,
  $location,
  $services,
  $message
);

// ===============================
// EXECUTE
// ===============================
if ($stmt->execute()) {
    echo "✅ Registration submitted successfully!";
} else {
    echo "❌ Error saving registration";
}

$stmt->close();
$conn->close();
?>