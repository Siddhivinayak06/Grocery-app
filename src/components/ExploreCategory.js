import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';

const ExploreCategory = ({ category, products, addToCart, addToWishlist, showQuickView, isLoading }) => {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Filter and sort products when category, products, or sort options change
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by category (if not 'all')
    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }
    
    // Sort products
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch(sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = parseFloat(a.price) - parseFloat(b.price);
          break;
        case 'discount':
          const discountA = a.discount_percent || 0;
          const discountB = b.discount_percent || 0;
          comparison = discountB - discountA; // Higher discounts first
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    setFilteredProducts(filtered);
  }, [category, products, sortBy, sortOrder]);
  
  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  return (
    <div className="explore-category">
      <div className="explore-header">
        <div className="category-banner" style={{ 
          backgroundImage: `url(https://source.unsplash.com/1200x300/?${category.toLowerCase()},food)` 
        }}>
          <div className="category-overlay">
            <h1 className="category-title">
              {category === 'all' ? 'All Products' : `${category} Products`}
            </h1>
            <p className="category-description">
              {category === 'all' 
                ? 'Explore our wide range of products' 
                : `Discover our selection of ${category.toLowerCase()} products`}
            </p>
          </div>
        </div>
      </div>
      
      <div className="explore-controls">
        <div className="product-count">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
        </div>
        
        <div className="sort-controls">
          <div className="form-group">
            <label htmlFor="sortBy">Sort by:</label>
            <select 
              id="sortBy" 
              className="form-select" 
              value={sortBy} 
              onChange={handleSortChange}
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="discount">Discount</option>
            </select>
          </div>
          
          <button 
            className="btn btn-outline-secondary sort-order-btn" 
            onClick={toggleSortOrder}
            aria-label={`Sort ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
          >
            <i className={`bi bi-sort-${sortOrder === 'asc' ? 'down' : 'up'}`}></i>
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <ProductList 
          products={filteredProducts}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          showQuickView={showQuickView}
        />
      ) : (
        <div className="alert alert-info text-center">
          No products found in this category. Please check back soon.
        </div>
      )}
    </div>
  );
};

export default ExploreCategory; 