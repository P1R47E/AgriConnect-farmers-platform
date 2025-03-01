import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './productDetailPage.css'; // Import your CSS file for styling
import Footer from '../Footer';
import Header from '../Header';

const ProductDetailPage = () => {
  const { id } = useParams(); // Get productId from URL parameter
  const [product, setProduct] = useState(null); // State to hold product details

  useEffect(() => {
    // Fetch product details using productId
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/products/singleProduct/${id}`);
        const productData = response.data;
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]); // Fetch product details whenever id changes

  return (
    <>
    <Header/>
    <div className='center'>
      <div className="product-detail-container"> {/* Add a class for styling */}
      <h2 className="product-detail-title">Product Detail</h2> {/* Add a class for styling */}
      {product ? (
        <div className="product-detail-info"> {/* Add a class for styling */}
          <div className="product-detail-header">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-header-details">
              <p><strong>Name:</strong> {product.name}</p>
              <p><strong>Price:</strong> ETB:{product.price}/Quintals</p>
              <p><strong>Available Quantity:</strong> {product.availableQuantity}</p>
              <p><strong>Farmer Name:</strong> {product.productOwner}</p>
              <p><strong>Created At:</strong> {product.createdAt}</p>
              <p><strong>Updated At:</strong> {product.updatedAt}</p>
            </div>
          </div>
          <div className="description-container"> {/* Container specifically for the description */}
            <strong>Description:</strong>
            <p className="description">{product.description}</p>
          </div>
          {/* Render other product details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default ProductDetailPage;
