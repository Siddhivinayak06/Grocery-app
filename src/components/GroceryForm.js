import React, { useState, useEffect } from 'react';

const GroceryForm = ({ addGroceryItem, updateGroceryItem, currentItem }) => {
  const initialFormState = {
    name: '',
    quantity: '',
    price: '',
    category: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);
  
  useEffect(() => {
    if (currentItem) {
      setFormData(currentItem);
    } else {
      setFormData(initialFormState);
    }
  }, [currentItem]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.quantity || !formData.price || !formData.category) {
      alert('Please fill in all fields');
      return;
    }
    
    if (currentItem) {
      updateGroceryItem(currentItem.id, formData);
    } else {
      addGroceryItem(formData);
    }
    
    // Reset form
    setFormData(initialFormState);
  };
  
  const cancelEdit = () => {
    setFormData(initialFormState);
  };
  
  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h4>{currentItem ? 'Edit Grocery Item' : 'Add New Grocery Item'}</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter item name"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Enter quantity"
              min="1"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price ($)</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              step="0.01"
              min="0.01"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              className="form-select"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Select category</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Dairy">Dairy</option>
              <option value="Meat">Meat</option>
              <option value="Bakery">Bakery</option>
              <option value="Pantry">Pantry</option>
              <option value="Frozen">Frozen</option>
              <option value="Beverages">Beverages</option>
              <option value="Snacks">Snacks</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-success">
              {currentItem ? 'Update Item' : 'Add Item'}
            </button>
            
            {currentItem && (
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroceryForm; 