import React from 'react';
import CompactProductCard from './CompactProductCard';

const SpecialDeals = ({ 
  featuredProducts = [], 
  saleProducts = [],
  addToCart,
  addToWishlist,
  showQuickView
}) => {
  // Check if featuredProducts and saleProducts are defined
  const hasFeaturedProducts = featuredProducts && featuredProducts.length > 0;
  const hasSaleProducts = saleProducts && saleProducts.length > 0;
  
  if (!hasFeaturedProducts && !hasSaleProducts) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          Loading special deals...
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mt-5">
      {/* Featured Products */}
      {hasFeaturedProducts && (
        <div className="mb-5">
          <h3 className="section-title">Featured Products</h3>
          <div className="row g-4 mt-3">
            {featuredProducts.map(product => (
              <div key={product.id} className="col-md-6 col-lg-3">
                <CompactProductCard 
                  product={product}
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                  showQuickView={showQuickView}
                  isFeatured={true}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Special Sale Products */}
      {hasSaleProducts && (
        <div className="mb-5">
          <h3 className="section-title">Special Offers</h3>
          <div className="row g-4 mt-3">
            {saleProducts.map(product => (
              <div key={product.id} className="col-6 col-md-4 col-lg-2">
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
        </div>
      )}
    </div>
  );
};

export default SpecialDeals; 