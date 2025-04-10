import React from 'react';

const ShoppingCart = ({ 
  cart, 
  updateQuantity, 
  removeFromCart, 
  totalPrice, 
  checkout,
  clearCart 
}) => {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img 
              src={`https://source.unsplash.com/100x100/?${item.category},${item.name.split(' ')[0].toLowerCase()}&sig=${item.id}`}
              alt={item.name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h4 className="cart-item-title">{item.name}</h4>
              <div className="cart-item-price">
                <span className="cart-item-current-price">
                  ${item.discount_percent > 0 
                    ? (item.price * (1 - item.discount_percent / 100)).toFixed(2) 
                    : parseFloat(item.price).toFixed(2)}
                </span>
                {item.discount_percent > 0 && (
                  <span className="cart-item-old-price">${parseFloat(item.price).toFixed(2)}</span>
                )}
              </div>
              <div className="cart-item-controls">
                <div className="cart-quantity-controls">
                  <button 
                    className="cart-quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <i className="bi bi-dash"></i>
                  </button>
                  <span className="cart-quantity-value">{item.quantity}</span>
                  <button 
                    className="cart-quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <button 
              className="cart-item-remove"
              onClick={() => removeFromCart(item.id)}
              aria-label="Remove item"
            >
              <i className="bi bi-x"></i>
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart-footer">
        <div className="cart-summary">
          <div className="cart-summary-row">
            <span className="cart-summary-label">Items ({totalItems})</span>
            <span className="cart-summary-value">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span className="cart-summary-label">Shipping</span>
            <span className="cart-summary-value">FREE</span>
          </div>
          <div className="cart-total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="cart-actions">
          <button className="checkout-btn" onClick={checkout}>
            <i className="bi bi-credit-card"></i> Checkout Now
          </button>
          <button className="clear-cart-btn" onClick={clearCart}>
            <i className="bi bi-trash"></i> Clear Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart; 