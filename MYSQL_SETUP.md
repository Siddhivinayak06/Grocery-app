# MySQL and PHP Setup Guide

This guide will help you set up the MySQL database and PHP backend for the grocery shopping website.

## Prerequisites
- A local web server with PHP support (XAMPP, WAMP, MAMP, etc.)
- MySQL database server
- Web browser

## Database Setup

1. Start your MySQL server and make sure it's running
2. Open your MySQL client (phpMyAdmin, MySQL Workbench, or command line)
3. Create a new database called `grocery_db` or import the existing database:

```sql
CREATE DATABASE IF NOT EXISTS grocery_db;
```

4. Import the database schema and sample data from `api/database.sql`:
   - In phpMyAdmin: Select the `grocery_db` database → Import → Choose file (api/database.sql) → Go
   - From command line: `mysql -u root -p grocery_db < api/database.sql`

## PHP Backend Setup

1. Make sure your web server (Apache, etc.) is running
2. Copy the entire project folder to your web server's document root:
   - For XAMPP: Copy to `htdocs/grocery-app/`
   - For WAMP: Copy to `www/grocery-app/`
   - For MAMP: Copy to `htdocs/grocery-app/`

3. Check the database connection settings in `api/config.php`:
```php
$host = "localhost";
$username = "root"; // Change if needed
$password = "password"; // Change to your MySQL password
$database = "grocery_db";
```

4. Update these credentials if needed to match your MySQL setup

## Testing the Backend

1. Open your web browser and navigate to:
```
http://localhost/grocery-app/api/items.php
```

2. You should see a JSON response with all grocery products
3. Test other endpoints:
   - Categories: `http://localhost/grocery-app/api/items.php?categories=true`
   - Products by category: `http://localhost/grocery-app/api/items.php?category=Fruits`
   - Featured products: `http://localhost/grocery-app/api/items.php?featured=true`
   - Sale products: `http://localhost/grocery-app/api/items.php?sale=true`

## Frontend Integration

1. Make sure the `API_URL` in `src/App.js` points to your PHP backend:
```javascript
const API_URL = 'http://localhost/grocery-app/api';
```

2. Start the React development server:
```
npm start
```

3. The frontend will now fetch data from your MySQL database through the PHP API instead of using mock data

## Troubleshooting

- **Database Connection Issues**: Check your MySQL credentials in `api/config.php`
- **CORS Errors**: Make sure the CORS headers in `api/items.php` allow requests from your frontend
- **PHP Errors**: Check your web server's error logs for PHP-related issues
- **404 Not Found**: Verify that your API endpoints are accessible at the correct URLs

## Additional Notes

- The application includes a fallback to mock data if the PHP API cannot be reached.
- To modify the database schema or add more sample data, edit the `api/database.sql` file.

- For production deployment, remove the mock data fallback and ensure proper error handling. 
