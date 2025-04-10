import React, { useState, useEffect } from 'react';
import CompactProductCard from './CompactProductCard';

const Deals = ({ 
  saleProducts, 
  addToCart, 
  addToWishlist, 
  showQuickView
}) => {
  const [dealCategories, setDealCategories] = useState([]);
  const [selectedDealsCategory, setSelectedDealsCategory] = useState('all');
  const [filteredDeals, setFilteredDeals] = useState([]);
  
  useEffect(() => {
    if (saleProducts.length > 0) {
      // Extract unique categories from sale products
      const categories = ['all', ...new Set(saleProducts.map(product => product.category))];
      setDealCategories(categories);
      
      // Set filtered deals based on selected category
      filterDealsByCategory(selectedDealsCategory);
    }
  }, [saleProducts, selectedDealsCategory]);
  
  const filterDealsByCategory = (category) => {
    if (category === 'all') {
      setFilteredDeals(saleProducts);
    } else {
      setFilteredDeals(saleProducts.filter(product => product.category === category));
    }
  };
  
  const handleDealCategoryChange = (category) => {
    setSelectedDealsCategory(category);
  };
  
  // Calculate highest discount
  const highestDiscount = saleProducts.length > 0 
    ? Math.max(...saleProducts.map(product => product.discount_percent))
    : 0;
  
  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-md-6">
          <h1 className="deals-title">Special Deals</h1>
          <p className="text-muted">Discover amazing discounts on your favorite products.</p>
        </div>
        <div className="col-md-6 text-md-end">
          <div className="highest-discount-badge">
            Up to {highestDiscount}% OFF
          </div>
        </div>
      </div>
      
      {/* Deal categories pills */}
      <div className="deals-categories mb-4">
        {dealCategories.map(category => (
          <button 
            key={category}
            className={`deal-category-pill ${selectedDealsCategory === category ? 'active' : ''}`}
            onClick={() => handleDealCategoryChange(category)}
          >
            {category === 'all' ? 'All Deals' : category}
          </button>
        ))}
      </div>
      
      {/* Featured Deal (first item) */}
      {filteredDeals.length > 0 && (
        <div className="row mb-5">
          <div className="col-12">
            <div className="featured-deal">
              <div className="row g-0">
                <div className="col-lg-6">
                  <img 
                    src={`https://source.unsplash.com/600x400/?${filteredDeals[0].name.split(' ')[0].toLowerCase()},grocery`} 
                    alt={filteredDeals[0].name}
                    className="featured-deal-img"
                  />
                  <div className="featured-deal-badge">
                    SUPER DEAL
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="featured-deal-content">
                    <div className="discount-bubble">{filteredDeals[0].discount_percent}% OFF</div>
                    <h2>{filteredDeals[0].name}</h2>
                    <p className="featured-deal-description">
                      {filteredDeals[0].description || "Limited time offer! Don't miss out on this amazing deal."}
                    </p>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <span className="original-price h5">${parseFloat(filteredDeals[0].price).toFixed(2)}</span>
                      <span className="sale-price h3">${parseFloat(filteredDeals[0].sale_price).toFixed(2)}</span>
                    </div>
                    <div className="d-flex gap-3">
                      <button 
                        className="btn btn-lg btn-success"
                        onClick={() => addToCart(filteredDeals[0])}
                      >
                        <i className="bi bi-cart-plus me-2"></i>
                        Add to Cart
                      </button>
                      <button 
                        className="btn btn-lg btn-outline-danger"
                        onClick={() => addToWishlist(filteredDeals[0])}
                      >
                        <i className="bi bi-heart me-2"></i>
                        Add to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* All Deals */}
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
        {filteredDeals.slice(1).map(product => (
          <div className="col" key={product.id}>
            <CompactProductCard 
              product={product}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              showQuickView={showQuickView}
              isFeatured={false}
            />
          </div>
        ))}
      </div>
      
      {/* Limited Time Banner */}
      <div className="limited-time-banner mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2>Limited Time Offers</h2>
            <p>Hurry! These deals won't last forever. Shop now and save big on your favorite products.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="countdown-container">
              <div className="countdown-item">
                <div className="countdown-value">7</div>
                <div className="countdown-label">Days</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-value">12</div>
                <div className="countdown-label">Hours</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-value">45</div>
                <div className="countdown-label">Minutes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals; 