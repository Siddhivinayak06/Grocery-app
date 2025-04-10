import React, { useState } from 'react';
import ExploreCategory from './ExploreCategory';

const Categories = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory, 
  products, 
  addToCart, 
  addToWishlist,
  showQuickView,
  isLoading 
}) => {
  const [showExplore, setShowExplore] = useState(false);
  const [exploreCategory, setExploreCategory] = useState(null);
  
  // Generate a category image from Unsplash based on category name
  const getCategoryImage = (category) => {
    return `https://source.unsplash.com/300x200/?${category.toLowerCase()},food&sig=${Math.random()}`;
  };

  // Handle the category selection
  const handleCategorySelect = (category) => {
    if (typeof onSelectCategory === 'function') {
      onSelectCategory(category);
    }
  };
  
  // Handle explore button click
  const handleExploreClick = (e, category) => {
    e.stopPropagation(); // Prevent category selection
    setExploreCategory(category);
    setShowExplore(true);
    // Scroll to explore section
    setTimeout(() => {
      document.getElementById('explore-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <div className="categories-container">
      <div className="container py-5">
        <h1 className="text-center mb-5">Browse Categories</h1>
        
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {/* All Categories option */}
          <div className="col">
            <div 
              className={`category-card ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategorySelect('all')}
            >
              <div className="category-img-container">
                <img 
                  src="https://source.unsplash.com/300x200/?groceries,supermarket" 
                  alt="All Categories" 
                  className="category-img" 
                />
              </div>
              <div className="category-name">
                <h4>All Categories</h4>
                <div 
                  className="explore-btn"
                  onClick={(e) => handleExploreClick(e, 'all')}
                >
                  <span>Explore</span>
                  <i className="bi bi-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Individual categories */}
          {categories.map((category) => (
            <div className="col" key={category}>
              <div 
                className={`category-card ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategorySelect(category)}
              >
                <div className="category-img-container">
                  <img 
                    src={getCategoryImage(category)} 
                    alt={category} 
                    className="category-img" 
                  />
                </div>
                <div className="category-name">
                  <h4>{category}</h4>
                  <div 
                    className="explore-btn"
                    onClick={(e) => handleExploreClick(e, category)}
                  >
                    <span>Explore</span>
                    <i className="bi bi-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {showExplore && exploreCategory && (
          <div id="explore-section" className="mt-5 pt-3">
            <ExploreCategory 
              category={exploreCategory}
              products={products}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              showQuickView={showQuickView}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories; 