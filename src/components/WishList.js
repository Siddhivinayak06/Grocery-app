import React from 'react';

const WishList = ({ wishlist, removeFromWishlist, moveToCart }) => {
  return (
    <>
      <div className="wishlist-items">
        {wishlist.map(item => (
          <div key={item.id} className="wishlist-item">
            <div className="wishlist-item-content">
              <img 
                src={`https://source.unsplash.com/100x100/?${item.category},${item.name.split(' ')[0].toLowerCase()}&sig=${item.id}`}
                alt={item.name}
                className="wishlist-item-image"
              />
              <div className="wishlist-item-details">
                <h4 className="wishlist-item-title">{item.name}</h4>
                <span className="wishlist-item-category">{item.category}</span>
                <div className="wishlist-item-price">
                  ${item.discount_percent > 0 
                    ? (item.price * (1 - item.discount_percent / 100)).toFixed(2) 
                    : parseFloat(item.price).toFixed(2)}
                </div>
                {item.description && (
                  <p className="wishlist-item-description">
                    {item.description.length > 50 
                      ? `${item.description.substring(0, 50)}...` 
                      : item.description}
                  </p>
                )}
              </div>
              <button 
                className="wishlist-item-remove"
                onClick={() => removeFromWishlist(item.id)}
                aria-label="Remove from wishlist"
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
            <div className="wishlist-item-actions">
              <button 
                className="wishlist-move-to-cart"
                onClick={() => moveToCart(item)}
              >
                <i className="bi bi-cart-plus"></i> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="wishlist-footer">
        <div className="wishlist-stats">
          <span>Saved items: <span className="wishlist-count">{wishlist.length}</span></span>
        </div>
      </div>
    </>
  );
};

export default WishList; 