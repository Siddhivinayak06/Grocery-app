import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ totalItems, toggleCart, toggleWishlist, wishlistItems }) => {
  const [scrolled, setScrolled] = useState(false);
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-basket me-2"></i>
          <span className="brand-text">FreshMart</span>
        </Link>

        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                } 
                to="/"
              >
                <i className="bi bi-house-door nav-icon"></i>
                <span>Home</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                } 
                to="/categories"
              >
                <i className="bi bi-grid nav-icon"></i>
                <span>Categories</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                } 
                to="/deals"
              >
                <i className="bi bi-tag nav-icon"></i>
                <span>Deals</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                } 
                to="/contact"
              >
                <i className="bi bi-chat-dots nav-icon"></i>
                <span>Contact</span>
              </NavLink>
            </li>
          </ul>
          
          <div className="nav-buttons">
            <button 
              className="btn btn-icon position-relative me-3"
              onClick={toggleWishlist}
              aria-label="Wishlist"
            >
              <i className="bi bi-heart"></i>
              {wishlistItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                  {wishlistItems}
                  <span className="visually-hidden">items in wishlist</span>
                </span>
              )}
            </button>
            
            <button 
              className="btn btn-primary cart-btn position-relative"
              onClick={toggleCart}
              aria-label="Shopping Cart"
            >
              <i className="bi bi-cart3 me-2"></i> 
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                  {totalItems}
                  <span className="visually-hidden">items in cart</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 