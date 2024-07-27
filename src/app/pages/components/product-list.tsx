'use client'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../model/product';
import { fetchProducts } from '../../service/products';


const ProductList: React.FC<any> = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const retrieveProducts = () => {
      try {
        fetchProducts(setProducts);
      } catch (error) {
        // Handle error
      }
    };
    retrieveProducts();
  }, []);

  if (!products || products.length == 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Link to={`/product-detail/${product.id}`}>
            <img src={product.image} alt={product.title} className="w-full h-64 object-contain" />
            <div className="p-4">
              <h2 className="font-bold text-xl mb-2">{product.title}</h2>
              <p className="text-gray-800">${product.price}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
