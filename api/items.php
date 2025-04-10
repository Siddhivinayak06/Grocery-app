<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection details
$host = "localhost";
$username = "root";
$password = "Omshri#20"; // Change this if needed
$database = "grocery_db";

// Connect to database
$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Helper function to handle database errors
function handleError($conn, $message) {
    http_response_code(500);
    echo json_encode([
        "error" => $message,
        "details" => $conn->error
    ]);
    exit();
}

// Handle query parameters
$query = isset($_SERVER['QUERY_STRING']) ? $_SERVER['QUERY_STRING'] : '';
parse_str($query, $params);

// Get the request method
$method = $_SERVER['REQUEST_METHOD'];

// New routing logic based on query parameters
if (isset($params['categories']) && $params['categories'] === 'true') {
    // Get all categories
    getCategories($conn);
} else if (isset($params['category'])) {
    // Get products by category
    getProductsByCategory($conn, $params['category']);
} else if (isset($params['featured']) && $params['featured'] === 'true') {
    // Get featured products
    getFeaturedProducts($conn);
} else if (isset($params['sale']) && $params['sale'] === 'true') {
    // Get sale products
    getSaleProducts($conn);
} else if (isset($params['id'])) {
    // Get product by ID
    getProductById($conn, $params['id']);
} else {
    // Default: Get all products
    getAllProducts($conn);
}

function getAllProducts($conn) {
    $sql = "SELECT * FROM grocery_items ORDER BY name";
    $result = $conn->query($sql);
    
    if (!$result) {
        handleError($conn, "Failed to fetch products");
    }
    
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $row['sale_price'] = calculateSalePrice($row['price'], $row['discount_percent']);
        $products[] = $row;
    }
    
    echo json_encode($products);
}

function getProductsByCategory($conn, $category) {
    // Allow 'all' as a special category to get all products
    if (strtolower($category) === 'all') {
        getAllProducts($conn);
        return;
    }
    
    $sql = "SELECT * FROM grocery_items WHERE category = ? ORDER BY name";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $category);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if (!$result) {
        handleError($conn, "Failed to fetch products by category");
    }
    
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $row['sale_price'] = calculateSalePrice($row['price'], $row['discount_percent']);
        $products[] = $row;
    }
    
    echo json_encode($products);
}

function getCategories($conn) {
    $sql = "SELECT DISTINCT category FROM grocery_items ORDER BY category";
    $result = $conn->query($sql);
    
    if (!$result) {
        handleError($conn, "Failed to fetch categories");
    }
    
    $categories = [];
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row['category'];
    }
    
    echo json_encode($categories);
}

function getFeaturedProducts($conn) {
    $sql = "SELECT * FROM grocery_items WHERE is_featured = 1 ORDER BY RAND() LIMIT 6";
    $result = $conn->query($sql);
    
    if (!$result) {
        handleError($conn, "Failed to fetch featured products");
    }
    
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $row['sale_price'] = calculateSalePrice($row['price'], $row['discount_percent']);
        $products[] = $row;
    }
    
    echo json_encode($products);
}

function getSaleProducts($conn) {
    $sql = "SELECT * FROM grocery_items WHERE discount_percent > 0 ORDER BY discount_percent DESC LIMIT 6";
    $result = $conn->query($sql);
    
    if (!$result) {
        handleError($conn, "Failed to fetch sale products");
    }
    
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $row['sale_price'] = calculateSalePrice($row['price'], $row['discount_percent']);
        $products[] = $row;
    }
    
    echo json_encode($products);
}

function getProductById($conn, $id) {
    $sql = "SELECT * FROM grocery_items WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if (!$result) {
        handleError($conn, "Failed to fetch product by ID");
    }
    
    if ($result->num_rows > 0) {
        $product = $result->fetch_assoc();
        $product['sale_price'] = calculateSalePrice($product['price'], $product['discount_percent']);
        echo json_encode($product);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Product not found"]);
    }
}

function calculateSalePrice($price, $discountPercent) {
    if ($discountPercent <= 0) return null;
    return round($price * (1 - ($discountPercent / 100)), 2);
}

// Close the database connection
$conn->close();
?> 