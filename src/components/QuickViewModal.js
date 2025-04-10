import React, { useState } from 'react';

const QuickViewModal = ({ product, addToCart, addToWishlist, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  
  // Mock reviews data
  const reviews = [
    { id: 1, name: 'John D.', rating: 5, text: 'Great product! Very fresh and tasty.', date: '2023-11-15' },
    { id: 2, name: 'Sarah M.', rating: 4, text: 'Good quality. Fast delivery.', date: '2023-11-10' },
    { id: 3, name: 'Mike T.', rating: 5, text: 'Excellent value for money. Will buy again!', date: '2023-10-28' },
  ];
  
  // Calculate average rating
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  
  // Format price
  const formattedPrice = parseFloat(product.price).toFixed(2);
  const salePrice = product.discount_percent > 0 
    ? (product.price * (1 - product.discount_percent / 100)).toFixed(2) 
    : null;
  
  // Handle increment and decrement of quantity
  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => q > 1 ? q - 1 : 1);
  
  // Close modal when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };
  
  // Handle adding to cart
  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };
  
  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
      } else if (i - 0.5 <= rating) {
        stars.push(<i key={i} className="bi bi-star-half text-warning"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star text-warning"></i>);
      }
    }
    return stars;
  };
  
  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="quick-view-modal">
        <button className="modal-close-btn" onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>
        
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="product-image-container">
              <img 
                src={`https://source.unsplash.com/600x600/?${product.category},${product.name.split(' ')[0].toLowerCase()}&sig=${product.id}`}
                alt={product.name}
                className="img-fluid rounded product-detail-image"
              />
              {product.discount_percent > 0 && (
                <div className="discount-flag">
                  {product.discount_percent}% OFF
                </div>
              )}
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="product-details">
              <h3 className="product-title">{product.name}</h3>
              
              <div className="product-rating mb-2">
                {renderStars(averageRating)}
                <span className="ms-2 text-muted">({reviews.length} reviews)</span>
              </div>
              
              <div className="product-price-container mb-3">
                {product.discount_percent > 0 && (
                  <span className="original-price h5">${formattedPrice}</span>
                )}
                <span className="modal-product-price">${salePrice || formattedPrice}</span>
              </div>
              
              {product.description && (
                <p className="product-description mb-4">
                  {product.description}
                </p>
              )}
              
              <div className="tabs mb-4">
                <div className="tab-buttons">
                  <button 
                    className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
                    onClick={() => setActiveTab('details')}
                  >
                    Details
                  </button>
                  <button 
                    className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Reviews ({reviews.length})
                  </button>
                </div>
                
                <div className="tab-content">
                  {activeTab === 'details' && (
                    <div className="details-tab">
                      <table className="product-details-table">
                        <tbody>
                          <tr>
                            <td>Category:</td>
                            <td>{product.category}</td>
                          </tr>
                          <tr>
                            <td>Availability:</td>
                            <td>
                              {product.quantity > 10 ? (
                                <span className="text-success">In Stock</span>
                              ) : product.quantity > 0 ? (
                                <span className="text-warning">Low Stock (Only {product.quantity} left)</span>
                              ) : (
                                <span className="text-danger">Out of Stock</span>
                              )}
                            </td>
                          </tr>
                          {product.discount_percent > 0 && (
                            <tr>
                              <td>Discount:</td>
                              <td className="text-danger">{product.discount_percent}% OFF</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                  
                  {activeTab === 'reviews' && (
                    <div className="reviews-tab">
                      {reviews.map(review => (
                        <div key={review.id} className="review-item">
                          <div className="review-header">
                            <div className="reviewer-name">{review.name}</div>
                            <div className="review-rating">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <div className="review-date text-muted small">{review.date}</div>
                          <div className="review-text mt-2">{review.text}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="quantity-selector mb-3">
                <label>Quantity:</label>
                <div className="quantity-input">
                  <button 
                    className="quantity-btn"
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                  <input 
                    type="text" 
                    className="quantity-value"
                    value={quantity}
                    readOnly
                  />
                  <button 
                    className="quantity-btn"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="product-actions">
                <button 
                  className="btn btn-outline-danger btn-lg"
                  onClick={() => {
                    addToWishlist(product);
                  }}
                >
                  <i className="bi bi-heart me-2"></i>
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Large Add to Cart Button */}
        <div className="quick-view-footer mt-4">
          <button 
            className="add-to-cart-btn-large"
            onClick={handleAddToCart}
            disabled={product.quantity === 0}
          >
            <i className="bi bi-cart-plus me-2"></i>
            Add to Cart - ${salePrice || formattedPrice}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal; 