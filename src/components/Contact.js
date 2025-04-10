import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    // For demo purposes, we'll just show a success message
    setFormStatus('success');
    
    // Reset form after successful submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Contact Us</h1>
      
      <div className="row">
        {/* Contact Information */}
        <div className="col-lg-4 mb-4 mb-lg-0">
          <div className="contact-info-card">
            <h3>Get In Touch</h3>
            <p className="text-muted mb-4">We would love to hear from you! Contact us with any questions, suggestions, or feedback.</p>
            
            <div className="contact-item">
              <i className="bi bi-geo-alt contact-icon"></i>
              <div>
                <h5>Our Location</h5>
                <p>123 Grocery Street, Fresh City, FC 12345</p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="bi bi-telephone contact-icon"></i>
              <div>
                <h5>Phone Number</h5>
                <p>(123) 456-7890</p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="bi bi-envelope contact-icon"></i>
              <div>
                <h5>Email Address</h5>
                <p>contact@freshmart.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="bi bi-clock contact-icon"></i>
              <div>
                <h5>Opening Hours</h5>
                <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p>Saturday - Sunday: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
            
            <div className="social-links mt-4">
              <a href="#" className="social-link">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-link">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="bi bi-pinterest"></i>
              </a>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="col-lg-8">
          <div className="contact-form-card">
            <h3>Send Us a Message</h3>
            
            {formStatus === 'success' && (
              <div className="alert alert-success" role="alert">
                Thank you for your message! We will get back to you shortly.
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label">Your Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Your Message</label>
                <textarea 
                  className="form-control" 
                  id="message" 
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary submit-btn">
                <i className="bi bi-send me-2"></i>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Map and Store Locations */}
      <div className="mt-5">
        <h3 className="text-center mb-4">Our Stores</h3>
        
        <div className="store-map">
          {/* This is a placeholder for a map, you would typically use Google Maps or another mapping service */}
          <div className="map-placeholder">
            <i className="bi bi-map display-1"></i>
            <p>Interactive Map Coming Soon</p>
          </div>
        </div>
        
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-4">
          <div className="col">
            <div className="store-location-card">
              <h5>Downtown Store</h5>
              <p><i className="bi bi-geo-alt me-2"></i>123 Grocery Street, Fresh City</p>
              <p><i className="bi bi-telephone me-2"></i>(123) 456-7890</p>
              <button className="btn btn-sm btn-outline-success">Get Directions</button>
            </div>
          </div>
          <div className="col">
            <div className="store-location-card">
              <h5>East Side Branch</h5>
              <p><i className="bi bi-geo-alt me-2"></i>456 Farmer Avenue, Fresh City</p>
              <p><i className="bi bi-telephone me-2"></i>(123) 456-7891</p>
              <button className="btn btn-sm btn-outline-success">Get Directions</button>
            </div>
          </div>
          <div className="col">
            <div className="store-location-card">
              <h5>West End Market</h5>
              <p><i className="bi bi-geo-alt me-2"></i>789 Market Street, Fresh City</p>
              <p><i className="bi bi-telephone me-2"></i>(123) 456-7892</p>
              <button className="btn btn-sm btn-outline-success">Get Directions</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mt-5">
        <h3 className="text-center mb-4">Frequently Asked Questions</h3>
        
        <div className="accordion" id="contactFaq">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                Do you offer home delivery?
              </button>
            </h2>
            <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#contactFaq">
              <div className="accordion-body">
                Yes, we offer home delivery for orders above $30. Delivery is free for orders above $50. Our delivery areas include all of Fresh City and surrounding neighborhoods.
              </div>
            </div>
          </div>
          
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                What are your store hours?
              </button>
            </h2>
            <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#contactFaq">
              <div className="accordion-body">
                Our stores are open Monday through Friday from 8:00 AM to 8:00 PM, and on weekends from 9:00 AM to 6:00 PM. Special holiday hours may apply.
              </div>
            </div>
          </div>
          
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                Do you have a loyalty program?
              </button>
            </h2>
            <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#contactFaq">
              <div className="accordion-body">
                Yes, we have a FreshRewards loyalty program. Members earn points on every purchase and receive exclusive discounts and offers. You can sign up in-store or online.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 