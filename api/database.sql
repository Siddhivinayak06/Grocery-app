-- Create database
CREATE DATABASE IF NOT EXISTS grocery_db;

-- Use database
USE grocery_db;

-- Create table for grocery products
CREATE TABLE IF NOT EXISTS grocery_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(255),
    is_featured BOOLEAN DEFAULT 0,
    discount_percent INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table for orders
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    address TEXT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table for order items
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES grocery_items(id) ON DELETE CASCADE
);

-- Insert sample data for grocery products
INSERT INTO grocery_items (name, description, price, quantity, category, is_featured, discount_percent) VALUES
('Fresh Apples', 'Sweet and crisp red apples, perfect for snacking or baking.', 2.99, 50, 'Fruits', 1, 0),
('Organic Bananas', 'Naturally sweet and potassium-rich organic bananas.', 1.49, 75, 'Fruits', 0, 10),
('Avocados', 'Ripe and ready-to-eat Hass avocados.', 2.50, 30, 'Fruits', 1, 0),
('Strawberries', 'Sweet and juicy strawberries, freshly picked.', 3.99, 40, 'Fruits', 0, 0),
('Broccoli', 'Fresh broccoli crowns, rich in vitamins and nutrients.', 1.99, 35, 'Vegetables', 0, 0),
('Spinach', 'Organic baby spinach, pre-washed and ready to eat.', 2.99, 45, 'Vegetables', 0, 15),
('Carrots', 'Organic baby carrots, perfect for snacking.', 1.79, 60, 'Vegetables', 0, 0),
('Bell Peppers', 'Colorful bell peppers, perfect for salads and cooking.', 2.49, 40, 'Vegetables', 0, 0),
('Whole Milk', 'Fresh whole milk from local farms.', 3.49, 30, 'Dairy', 0, 0),
('Greek Yogurt', 'Creamy Greek yogurt, high in protein.', 4.99, 25, 'Dairy', 1, 20),
('Cheddar Cheese', 'Sharp cheddar cheese, aged for optimal flavor.', 5.49, 30, 'Dairy', 0, 0),
('Butter', 'Pure unsalted butter, perfect for baking.', 3.99, 35, 'Dairy', 0, 0),
('Chicken Breast', 'Boneless, skinless chicken breasts, hormone-free.', 7.99, 20, 'Meat', 1, 10),
('Ground Beef', 'Lean ground beef, perfect for burgers and tacos.', 6.99, 25, 'Meat', 0, 0),
('Salmon Fillets', 'Fresh Atlantic salmon fillets, rich in omega-3.', 12.99, 15, 'Seafood', 0, 15),
('Shrimp', 'Large peeled and deveined shrimp, ready to cook.', 9.99, 20, 'Seafood', 0, 0),
('Whole Wheat Bread', 'Freshly baked whole wheat bread, no preservatives.', 3.49, 30, 'Bakery', 0, 0),
('Baguette', 'Authentic French baguette, crispy outside and soft inside.', 2.99, 25, 'Bakery', 0, 0),
('Croissants', 'Buttery and flaky croissants, freshly baked.', 4.99, 20, 'Bakery', 1, 0),
('Pasta', 'Artisanal dried pasta, made with durum wheat.', 2.49, 50, 'Pantry', 0, 0),
('Rice', 'Premium long-grain white rice.', 3.99, 40, 'Pantry', 0, 0),
('Olive Oil', 'Extra virgin olive oil, cold-pressed.', 8.99, 30, 'Pantry', 0, 0),
('Cereal', 'Whole grain breakfast cereal, low in sugar.', 4.49, 35, 'Pantry', 0, 10); 