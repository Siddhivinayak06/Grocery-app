import React from 'react';

const HeroBanner = ({ onSearch }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value;
    onSearch(searchTerm);
  };

  return (
    <div className="hero-banner mb-5">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 hero-content">
            <h1 className="hero-title mb-3">Fresh Groceries Delivered to Your Door</h1>
            <p className="hero-subtitle mb-4">Shop from our wide selection of fresh fruits, vegetables, and pantry essentials</p>
            
            <form onSubmit={handleSearch} className="search-form mb-4">
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control search-input" 
                  placeholder="Search for products..." 
                  name="search"
                  aria-label="Search for products" 
                />
                <button className="btn btn-success" type="submit">
                  <i className="bi bi-search me-2"></i> Search
                </button>
              </div>
            </form>
            
            <div className="d-flex flex-wrap gap-3">
              <a href="#featured" className="hero-button">
                Featured Products
              </a>
              <a href="#deals" className="hero-button outline">
                Today's Deals
              </a>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            <div className="hero-image-container">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                alt="Fresh Groceries" 
                className="img-fluid rounded-3 hero-image"
              />
              <div className="floating-badge top">
                <span>100% Fresh</span>
              </div>
              <div className="floating-badge bottom">
                <span>Free Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner; 