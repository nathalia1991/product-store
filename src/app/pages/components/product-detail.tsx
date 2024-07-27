'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {Product} from '../../model/product';
import { fetchProduct } from '../../service/products';
import { connect, useDispatch } from 'react-redux';
import { addToCart } from '@/app/store/cart/slice';
import { toast } from 'react-toastify';



const ProductDetail: React.FC<any> = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product>();
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
      const retrieveProduct = () => {
        try {
          fetchProduct(!!id ? parseInt(id) : 0, setProduct);
        } catch (error) {
          // Handle error
        }
      };
      retrieveProduct();
    }, []);
  
    if (!product) return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

    const dispatch = useDispatch();

    const showMessage = (content: any) => toast.success(content, {autoClose: 5000});

    const handleQuantityChange = (e: any) => {
      setQuantity(e.target.value)
    }
  
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">

        <div className="flex flex-wrap -mx-4">

            <div className="w-full md:w-1/2 px-4 mb-4">
                <img src={product.image} alt={product.title} className="w-full rounded-lg shadow-md" />
            </div>
            
            <div className="w-full md:w-1/2 px-4 mb-4">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">{product.title}</h2>
                <p className="text-gray-700 mb-4">{product.description}</p>
                
                <div className="flex items-center mb-4">
                    <span className="text-gray-700 mr-2">Price:</span>
                    <span className="text-2xl font-semibold text-gray-900">${product.price}</span>
                </div>
                
                <div className="flex items-center mb-4">
                    <label className="text-gray-700 mr-2">
                      Text input: <input type="number" id="quantity" name="quantity" value={quantity} className="px-3 py-2 border border-gray-300 rounded-md w-16 text-center" onChange={handleQuantityChange}/>
                    </label>
                </div>
                
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => {dispatch(addToCart({product, quantity: quantity})); showMessage("Product: " + product?.title + " added to the cart");}}>Add to Cart</button>

                <div className="border-t border-gray-300 mt-8 pt-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-2">Brand:</span>
                            <span className="text-gray-900">Product Brand</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-2">Category:</span>
                            <span className="text-gray-900">Product Category</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-2">SKU:</span>
                            <span className="text-gray-900">Product SKU</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-2">Availability:</span>
                            <span className="text-green-600">In Stock</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    );
  };

export default connect()(ProductDetail);