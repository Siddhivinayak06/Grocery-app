import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, addToCart, addToWishlist, showQuickView }) => {
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique categories
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Filter products by category and search term
  const filteredProducts = products.filter(product => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-secondary" type="button">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
        
        <div className="col-md-6">
          <select 
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="alert alert-info text-center">
          No products found. Try a different search term or category.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredProducts.map(product => (
            <div className="col" key={product.id}>
              <ProductCard 
                product={product} 
                addToCart={addToCart}
                addToWishlist={addToWishlist}
                showQuickView={showQuickView}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList; 