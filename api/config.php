<?php
// Database configuration
$host = "localhost";
$username = "root";
$password = "Omshri#20";
$database = "grocery_db";

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?> 