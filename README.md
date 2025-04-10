# Grocery Shopping Website

A modern grocery shopping website with React frontend and PHP backend.

## Project Structure

- `src/` - Contains React components and frontend code
- `api/` - Contains PHP backend code and database scripts
- `public/` - Static assets

## Features

- Browse grocery products by category
- Search for products
- View product details with quick view modal
- Add products to shopping cart
- Add products to wishlist
- View featured and sale products
- Responsive design for all devices
- Quantity adjustment for products
- User-friendly notifications
- Special deals section

## Technologies Used

- React (Frontend)
- PHP (Backend API)
- MySQL (Database)
- jQuery (AJAX requests)
- Bootstrap (UI Framework)
- Bootstrap Icons (Icon library)

## Setup Instructions

### Frontend Setup
1. Clone the repository
2. Run `npm install` to install frontend dependencies
3. Start the React development server with `npm start`

### Backend Setup
1. Set up a local web server (like XAMPP, WAMP, or MAMP) for PHP and MySQL
2. Copy the `api` folder to your web server's root directory
3. Import `api/database.sql` into your MySQL database
4. Update database connection details in `api/items.php` if needed

### Accessing the Application
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost/grocery-app/api/items.php](http://localhost/grocery-app/api/items.php)

## API Endpoints

- `GET /items.php` - Get all products
- `GET /items.php/categories` - Get list of categories
- `GET /items.php/category?name={categoryName}` - Get products by category
- `GET /items.php/featured` - Get featured products
- `GET /items.php/sale` - Get products on sale
- `GET /items.php/product?id={productId}` - Get product by ID

## User Interface Features

### Shopping Cart
- View products in cart
- Adjust quantity of products
- Remove products from cart
- Calculate total price
- Checkout functionality

### Wishlist
- Add products to wishlist
- Remove products from wishlist
- Move products from wishlist to cart
- View all wishlist items

### Quick View Modal
- View product details without leaving the page
- See product reviews
- Add to cart directly from modal
- Add to wishlist directly from modal
- Adjust quantity before adding to cart 