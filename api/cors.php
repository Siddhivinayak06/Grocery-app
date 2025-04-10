<?php
// Remove any existing CORS headers that might be set in the PHP environment
if (function_exists('header_remove')) {
    header_remove('Access-Control-Allow-Origin');
}

// Enable CORS (Cross-Origin Resource Sharing)
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Simple response object
$response = [
    "status" => "success",
    "message" => "CORS is working!",
    "timestamp" => time(),
    "data" => [
        ["id" => 1, "name" => "Test Product 1", "price" => 19.99],
        ["id" => 2, "name" => "Test Product 2", "price" => 29.99],
        ["id" => 3, "name" => "Test Product 3", "price" => 39.99]
    ]
];

// Return JSON response
echo json_encode($response);
?> 