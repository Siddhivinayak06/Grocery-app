# FreshMart - Grocery Shopping Website

A full-featured grocery shopping website with React frontend and PHP backend.

## Prerequisites

- Node.js and npm installed
- PHP (7.4 or higher) installed
- MySQL database
- A local web server (XAMPP, WAMP, MAMP, etc.)

## Backend Setup (PHP/MySQL)

1. **Configure your web server**
   - If using XAMPP, place the `api` folder in your `htdocs` directory
   - If using WAMP, place the `api` folder in your `www` directory
   - If using MAMP, place the `api` folder in your `htdocs` directory

2. **Create the database**
   - Open phpMyAdmin (usually at http://localhost/phpmyadmin)
   - Create a new database named `grocery_db`
   - Import the `api/database.sql` file to set up the database structure and sample data

3. **Configure database connection**
   - Open `api/items.php` and update the database connection details if needed:
     ```php
     $host = "localhost";
     $username = "root"; // Change if your MySQL username is different
     $password = ""; // Add your MySQL password if you have one
     $database = "grocery_db";
     ```

## Frontend Setup (React)

1. **Install dependencies**
   - Navigate to the project root directory in your terminal
   - Run `npm install` to install all required dependencies

2. **Configure API URL**
   - Open `src/App.js` and update the API_URL to match your local server configuration:
     ```javascript
     const API_URL = 'http://localhost/grocery-app/api/items.php'; // Update path as needed
     ```

3. **Start the development server**
   - Run `npm start` to start the React development server
   - The app should open automatically in your browser at http://localhost:3000

## Features

- **Product Browsing**: View products by category, featured items, and items on sale
- **Search & Filter**: Search products and filter by category
- **Shopping Cart**: Add products to cart, update quantities, and remove items
- **Wishlist**: Save products for later, move items between wishlist and cart
- **Quick View**: View product details without leaving the current page
- **Special Deals**: Featured products and sale items highlighted in dedicated sections
- **Interactive UI**: Hover effects, notifications, and mobile-responsive design
- **Product Reviews**: View and read customer reviews for products
- **Checkout Process**: Simple checkout process with customer information
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## API Endpoints

The PHP backend provides the following API endpoints:

- `GET /items.php` - Get all products
- `GET /items.php/featured` - Get featured products
- `GET /items.php/sale` - Get products on sale
- `GET /items.php/categories` - Get all unique categories
- `GET /items.php/category?name={categoryName}` - Get products by category
- `GET /items.php/product?id={id}` - Get a single product
- `POST /items.php/order` - Create a new order

## User Interface Components

### Main Components

1. **Navbar**: Navigation bar with search, cart and wishlist buttons
2. **Product List**: Grid of product cards
3. **Shopping Cart**: Sidebar with cart items and checkout
4. **Wishlist**: Sidebar with saved items
5. **QuickView Modal**: Detailed product view with tabs
6. **Special Deals**: Featured and sale products sections
7. **Notification System**: Toast notifications for user actions

### User Interactions

- **Adding to Cart**: Click the cart button on a product card or in the quick view modal
- **Adding to Wishlist**: Click the heart button on a product card or in the quick view modal
- **Quick View**: Click on a product card to open the quick view modal
- **Filtering Products**: Click category pills to filter products
- **Searching**: Type in the search bar to find products
- **Cart Management**: Adjust quantities, remove items, or proceed to checkout
- **Wishlist Management**: Remove items or move them to your cart

## Troubleshooting

- **CORS Issues**: If you encounter CORS issues, make sure the headers in `api/items.php` are being properly applied.
- **Database Connection Errors**: Verify your MySQL server is running and the credentials in `items.php` are correct.
- **API Endpoint Issues**: Check that the API_URL in `App.js` points to the correct location of your PHP files.
- **Images Not Loading**: The app uses Unsplash placeholder images that require internet connection to load.

## Production Deployment

For production deployment:

1. Build the React app with `npm run build`
2. Copy the contents of the `build` folder to your web server
3. Copy the `api` folder to your web server
4. Configure your web server to serve the React app and API endpoints

## Local Storage

The application uses browser's localStorage to persist:
- Shopping cart items
- Wishlist items

This ensures that users won't lose their cart or wishlist data when refreshing the page or returning later. 