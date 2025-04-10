import React, { useState } from 'react';

const ProductCard = ({ product, addToCart, addToWishlist, showQuickView }) => {
  const { name, price, category, description, discount_percent, id } = product;
  const [isHovered, setIsHovered] = useState(false);
  const [animateButton, setAnimateButton] = useState(false);
  
  // Generate consistent image based on product ID and name
  const imageUrl = `https://source.unsplash.com/400x300/?${category},${name.split(' ')[0].toLowerCase()}&sig=${id}`;
  
  // Format price to 2 decimal places
  const formattedPrice = parseFloat(price).toFixed(2);
  const salePrice = discount_percent > 0 
    ? (price * (1 - discount_percent / 100)).toFixed(2) 
    : null;
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    setAnimateButton(true);
    
    // Remove animation class after animation completes
    setTimeout(() => setAnimateButton(false), 700);
    
    addToCart(product);
  };
  
  return (
    <div 
      className={`card product-card ${discount_percent > 0 ? 'on-sale' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="position-relative product-image-wrapper">
        <img 
          src={imageUrl}
          className="card-img-top product-image"
          alt={name}
          loading="lazy"
        />
        <div className="category-badge">
          {category}
        </div>
        
        {discount_percent > 0 && (
          <div className="discount-badge">
            <span>-{discount_percent}%</span>
          </div>
        )}
        
        {/* Quick actions overlay */}
        <div className={`product-actions ${isHovered ? 'visible' : ''}`}>
          <button 
            className="action-button wishlist-button"
            onClick={(e) => {
              e.stopPropagation();
              addToWishlist(product);
            }}
            title="Add to Wishlist"
            aria-label="Add to Wishlist"
          >
            <i className="bi bi-heart"></i>
          </button>
          <button 
            className="action-button view-button"
            onClick={(e) => {
              e.stopPropagation();
              showQuickView(product);
            }}
            title="Quick View"
            aria-label="Quick View"
          >
            <i className="bi bi-eye"></i>
          </button>
        </div>
      </div>
      
      <div className="card-body">
        <h5 className="product-title">{name}</h5>
        
        {description && (
          <p className="product-description">
            {description.length > 60 ? `${description.substring(0, 60)}...` : description}
          </p>
        )}
        
        <div className="price-rating-row">
          <div className="price-container">
            {discount_percent > 0 && (
              <span className="original-price">${formattedPrice}</span>
            )}
            <span className="current-price">${salePrice || formattedPrice}</span>
          </div>
          
          <div className="product-rating">
            <i className="bi bi-star-fill"></i>
            <span>4.5</span>
          </div>
        </div>
        
        <button 
          className={`add-to-cart-btn ${animateButton ? 'animate' : ''}`}
          onClick={handleAddToCart}
        >
          <i className="bi bi-cart-plus"></i>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 