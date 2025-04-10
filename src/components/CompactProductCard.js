import React from 'react';

const CompactProductCard = ({ product, addToCart, addToWishlist, showQuickView, isFeatured }) => {
  const getImageUrl = (name) => {
    return `https://source.unsplash.com/200x200/?${name.split(' ').join(',')},grocery`;
  };

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  const calculateDiscountPercent = (originalPrice, salePrice) => {
    if (!salePrice) return 0;
    const discount = ((originalPrice - salePrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  const discountPercent = product.sale_price 
    ? calculateDiscountPercent(product.price, product.sale_price)
    : 0;

  const handleQuickView = (e) => {
    e.stopPropagation();
    showQuickView(product);
  };

  if (isFeatured) {
    return (
      <div className="featured-product-card" onClick={handleQuickView}>
        <div className="position-relative">
          <img 
            src={getImageUrl(product.name)} 
            alt={product.name} 
            className="featured-product-image" 
          />
          <div className="featured-badge">
            <i className="bi bi-award-fill"></i> Featured
          </div>
          {product.sale_price && (
            <div className="discount-flag">
              {discountPercent}% OFF
            </div>
          )}
        </div>
        <div className="featured-content p-4">
          <h5 className="mb-2">{product.name}</h5>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {product.sale_price ? (
                <div className="d-flex align-items-center">
                  <span className="text-decoration-line-through text-muted me-2">
                    ${formatPrice(product.price)}
                  </span>
                  <span className="product-price-sm">
                    ${formatPrice(product.sale_price)}
                  </span>
                </div>
              ) : (
                <span className="product-price-sm">
                  ${formatPrice(product.price)}
                </span>
              )}
            </div>
            <div className="d-flex gap-2">
              <button 
                className="btn btn-sm btn-outline-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                <i className="bi bi-cart-plus"></i>
              </button>
              <button 
                className="btn btn-sm btn-outline-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  addToWishlist(product);
                }}
              >
                <i className="bi bi-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card-compact" onClick={handleQuickView}>
      <div className="position-relative">
        <img 
          src={getImageUrl(product.name)} 
          alt={product.name} 
          className="product-image-compact" 
        />
        {product.sale_price && (
          <div className="discount-flag discount-badge-large">
            {discountPercent}% OFF
          </div>
        )}
      </div>
      <div className="p-3">
        <h6 className="mb-2">{product.name}</h6>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            {product.sale_price ? (
              <div className="d-flex align-items-center">
                <span className="text-decoration-line-through text-muted me-2 small">
                  ${formatPrice(product.price)}
                </span>
                <span className="product-price-sm">
                  ${formatPrice(product.sale_price)}
                </span>
              </div>
            ) : (
              <span className="product-price-sm">
                ${formatPrice(product.price)}
              </span>
            )}
          </div>
          <button 
            className="btn btn-sm btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
          >
            <i className="bi bi-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompactProductCard; 