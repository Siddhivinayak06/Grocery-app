import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import Navbar from './components/Navbar';
import QuickViewModal from './components/QuickViewModal';
import WishList from './components/WishList';
import SpecialDeals from './components/SpecialDeals';
import Notification from './components/Notification';
import Categories from './components/Categories';
import Deals from './components/Deals';
import Contact from './components/Contact';
import HeroBanner from './components/HeroBanner';
import './App.css';

// We'll only import mock data if the API call fails
// We don't import it directly to ensure we try to use the database first

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start with loading state
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [notification, setNotification] = useState({
    message: '',
    type: 'success',
    isVisible: false
  });
  
  // Handle backdrop click to close panels
  const handleBackdropClick = () => {
    if (showCart) setShowCart(false);
    if (showWishlist) setShowWishlist(false);
  };
  
  // API endpoint (use mock data as fallback)
  const API_URL = 'http://localhost/grocery-app/api'; // Updated to use absolute URL to PHP API
  
  useEffect(() => {
    // Fetch all data from database via API
    fetchProducts();
    fetchCategories();
    fetchFeaturedProducts();
    fetchSaleProducts();
    
    // Load cart and wishlist from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);
  
  useEffect(() => {
    // Calculate total items and price when cart changes
    let items = 0;
    let price = 0;
    
    cart.forEach(item => {
      items += item.quantity;
      price += item.price * item.quantity;
    });
    
    setTotalItems(items);
    setTotalPrice(price);
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  // Save wishlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  
  // Fetch all grocery products
  const fetchProducts = (categoryName = null) => {
    setIsLoading(true);
    
    let url = `http://localhost/grocery-app/api/items.php`;
    if (categoryName && categoryName !== 'all') {
      url += `?category=${encodeURIComponent(categoryName)}`;
    }
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
        setIsLoading(false);
        
      });
  };
  
  // Fetch featured products
  const fetchFeaturedProducts = () => {
    fetch(`http://localhost/grocery-app/api/items.php?featured=true`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFeaturedProducts(data);
      })
      .catch(error => {
        console.error('Error fetching featured products:', error);
        
        
      });
  };
  
  // Fetch sale products
  const fetchSaleProducts = () => {
    fetch(`http://localhost/grocery-app/api/items.php?sale=true`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSaleProducts(data);
      })
      .catch(error => {
        console.error('Error fetching sale products:', error);
        
        
      });
  };
  
  // Fetch categories
  const fetchCategories = () => {
    fetch(`http://localhost/grocery-app/api/items.php?categories=true`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        
        
      });
  };
  
  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetchProducts(category);
  };
  
  // Add product to cart
  const addToCart = (product, quantity = 1) => {
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Product exists, update quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      // Add new product to cart with specified quantity
      setCart([...cart, { ...product, quantity }]);
    }
    
    // Show success notification
    showNotification(`${product.name} added to cart!`);
  };
  
  // Add product to wishlist
  const addToWishlist = (product) => {
    // Check if product already exists in wishlist
    if (!wishlist.some(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
      showNotification(`${product.name} added to wishlist!`);
    } else {
      showNotification(`${product.name} is already in your wishlist!`, 'info');
    }
  };
  
  // Remove product from wishlist
  const removeFromWishlist = (productId) => {
    const product = wishlist.find(item => item.id === productId);
    setWishlist(wishlist.filter(item => item.id !== productId));
    
    if (product) {
      showNotification(`${product.name} removed from wishlist!`, 'info');
    }
  };
  
  // Move product from wishlist to cart
  const moveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };
  
  // Remove product from cart
  const removeFromCart = (productId) => {
    const product = cart.find(item => item.id === productId);
    setCart(cart.filter(item => item.id !== productId));
    
    if (product) {
      showNotification(`${product.name} removed from cart!`, 'info');
    }
  };
  
  // Update product quantity in cart
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      // Remove product if quantity is 0 or less
      removeFromCart(productId);
    } else {
      // Update quantity
      const updatedCart = cart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
      setCart(updatedCart);
    }
  };
  
  // Toggle cart visibility
  const toggleCart = () => {
    setShowCart(!showCart);
    if (showWishlist) setShowWishlist(false);
  };
  
  // Toggle wishlist visibility
  const toggleWishlist = () => {
    setShowWishlist(!showWishlist);
    if (showCart) setShowCart(false);
  };
  
  // Clear cart
  const clearCart = () => {
    setCart([]);
    showNotification('Cart cleared!', 'info');
  };
  
  // Checkout functionality
  const checkout = () => {
    alert(`Thank you for your purchase! Total: $${totalPrice.toFixed(2)}`);
    clearCart();
  };
  
  // Show quick view modal
  const showQuickView = (product) => {
    setQuickViewProduct(product);
  };
  
  // Hide quick view modal
  const hideQuickView = () => {
    setQuickViewProduct(null);
  };
  
  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({
      message,
      type,
      isVisible: true
    });
  };
  
  // Hide notification
  const hideNotification = () => {
    setNotification(prev => ({
      ...prev,
      isVisible: false
    }));
  };
  
  // Search functionality
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    
    // If on a different route, navigate to home where the search will apply
    // This would need to be implemented with a useNavigate hook in a real component
  };
  
  // HomePage component enhancement with hero banner
  const HomePage = () => (
    <>
      <HeroBanner onSearch={handleSearch} />
      
      <div className="container py-4">
        <div className="row mb-5">
          <div className="col-12">
            <h2 className="section-title">Browse by Category</h2>
            <Categories 
              categories={categories} 
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
              products={products}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              showQuickView={showQuickView}
              isLoading={isLoading}
            />
          </div>
        </div>
        
        <div className="row mb-5" id="featured">
          <div className="col-12">
            <h2 className="section-title">Featured Products</h2>
            <div className="row">
              {isLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : featuredProducts.length > 0 ? (
                <ProductList 
                  products={featuredProducts} 
                  addToCart={addToCart} 
                  addToWishlist={addToWishlist} 
                  showQuickView={showQuickView}
                />
              ) : (
                <div className="col-12">
                  <div className="alert alert-info">No featured products available.</div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="row mb-5" id="deals">
          <div className="col-12">
            <h2 className="section-title">Special Deals</h2>
            <div className="row">
              {isLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : saleProducts.length > 0 ? (
                <SpecialDeals 
                  products={saleProducts} 
                  addToCart={addToCart} 
                  addToWishlist={addToWishlist} 
                  showQuickView={showQuickView}
                />
              ) : (
                <div className="col-12">
                  <div className="alert alert-info">No sale products available.</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h2 className="section-title">All Products</h2>
            {searchTerm && (
              <div className="alert alert-info mb-4">
                Showing results for: "{searchTerm}"
                <button 
                  className="btn btn-sm btn-outline-secondary ms-3"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </button>
              </div>
            )}
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <ProductList 
                products={
                  searchTerm 
                    ? products.filter(p => 
                        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.description.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                    : products
                } 
                addToCart={addToCart} 
                addToWishlist={addToWishlist} 
                showQuickView={showQuickView}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
  
  return (
    <Router>
      <div className="app-container">
        <Navbar 
          totalItems={totalItems} 
          toggleCart={toggleCart}
          toggleWishlist={toggleWishlist}
          wishlistItems={wishlist.length}
        />
        
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/categories" 
              element={
                <Categories 
                  categories={categories} 
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleCategorySelect}
                  products={products}
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                  showQuickView={showQuickView}
                  isLoading={isLoading}
                />
              } 
            />
            <Route 
              path="/deals" 
              element={
                <Deals 
                  saleProducts={saleProducts} 
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                  showQuickView={showQuickView}
                />
              } 
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        
        {/* Backdrop for side panels */}
        <div 
          className={`panel-backdrop ${showCart || showWishlist ? 'active' : ''}`}
          onClick={handleBackdropClick}
        ></div>
        
        {/* Side Panels (Cart & Wishlist) */}
        <div className={`side-panel-container ${showCart ? 'active' : ''}`}>
          <div className="side-panel-header">
            <h3 className="side-panel-title">
              <i className="bi bi-cart3"></i> Shopping Cart
            </h3>
            <button className="side-panel-close" onClick={toggleCart}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          
          <div className="side-panel-body">
            {cart.length === 0 ? (
              <div className="side-panel-empty">
                <i className="bi bi-cart-x empty-icon"></i>
                <p className="empty-message">Your cart is empty</p>
                <p className="empty-submessage">Add some products to your cart to see them here</p>
                <button className="empty-action-btn" onClick={toggleCart}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ShoppingCart 
                cart={cart} 
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                totalPrice={totalPrice}
                checkout={checkout}
                clearCart={clearCart}
              />
            )}
          </div>
        </div>
        
        <div className={`side-panel-container ${showWishlist ? 'active' : ''}`}>
          <div className="side-panel-header">
            <h3 className="side-panel-title">
              <i className="bi bi-heart"></i> Wishlist
            </h3>
            <button className="side-panel-close" onClick={toggleWishlist}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          
          <div className="side-panel-body">
            {wishlist.length === 0 ? (
              <div className="side-panel-empty">
                <i className="bi bi-heart empty-icon"></i>
                <p className="empty-message">Your wishlist is empty</p>
                <p className="empty-submessage">Add products to your wishlist to save them for later</p>
                <button className="empty-action-btn" onClick={toggleWishlist}>
                  Explore Products
                </button>
              </div>
            ) : (
              <WishList
                wishlist={wishlist}
                removeFromWishlist={removeFromWishlist}
                moveToCart={moveToCart}
              />
            )}
          </div>
        </div>
        
        {/* Floating Action Buttons (Mobile only) */}
        <div className="floating-action-buttons d-md-none">
          {!showWishlist && wishlist.length > 0 && (
            <button className="floating-wishlist-btn" onClick={toggleWishlist}>
              <i className="bi bi-heart-fill"></i>
              <span className="wishlist-count">{wishlist.length}</span>
            </button>
          )}
          
          {!showCart && totalItems > 0 && (
            <button className="floating-cart-btn" onClick={toggleCart}>
              <i className="bi bi-cart3"></i>
              <span className="cart-count">{totalItems}</span>
            </button>
          )}
        </div>
        
        {/* Quick View Modal */}
        {quickViewProduct && (
          <QuickViewModal 
            product={quickViewProduct}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            onClose={hideQuickView}
          />
        )}
        
        {/* Notification Component */}
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={hideNotification}
        />
      </div>
    </Router>
  );
}

export default App; 