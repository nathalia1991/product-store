'use client'
import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Product } from '@/app/model/product';
import { cleanCart, removeFromCart, updateCartProduct } from '@/app/store/cart/slice';
import Login from './login';
import { NavLink, useNavigate } from 'react-router-dom';
import { checkoutOrder } from '@/app/service/checkout';
import { toast } from 'react-toastify';


const Cart = () => {

    const checkoutSuccessMessage = () => toast.success('Checkout success', {autoClose: 8000});

    const user = useSelector((state) => {
        return state.user.user;
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => {
        return state.cart.products;
    });
    const token = useSelector((state: any) => {
        return state.token.token;
    });

    const triggerPayment = async (event) => {
        event.preventDefault(); 
        try {
          const payload = {
              orderItems: cart.map(item => {
                      return {
                          idProduct: item.product.id,
                          quantity: item.quantity,
                          unitPrice: item.product.price
                      }
                  })
              }
          checkoutOrder(payload, token, (data: any) => {
              checkoutSuccessMessage();
              dispatch(cleanCart({}))

              navigate('/profile');
          });
        } catch (error) {
          // Handle error
        }
      };


    if (!cart?.length || cart?.length == 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-2xl text-gray-600 mb-4">The cart is empty</p>
                <p className="text-gray-500">You should include at least one product to your shopping cart.</p>
            </div>
        );
    }


    return (
        <div>
            {
                cart.map(item => 
                    <div className="flex bg-white rounded-lg shadow-md overflow-hidden divide-3">
                        <div className="flex flex-col flex-grow p-4 w-1/5 align-middle">
                            <img src={item.product.image} alt={item.product.title} className="w-50 h-40 object-contain" />
                        </div>
                        
                        <div className="flex flex-col flex-grow p-4 w-3/5">
                        
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.product.title}</h2>
                            
                            <p className="text-gray-700 mb-2">{item.product.description}</p>
                            
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-700">Quantity:</span>
                                <span className="text-gray-700">{item.quantity}</span>
                            </div>
                            
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-700">Unit Price:</span>
                                <span className="text-gray-700">${item.product.price}</span>
                            </div>
                            
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-700">Total Price:</span>
                                <span className="text-gray-700">${item.quantity * item.product.price}</span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col flex-grow p-4  w-1/5 align-middle">
                            <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"  onClick={() => dispatch(removeFromCart(item.product))}>Remove</button>
                        </div>
                    </div>
                )
            }

            <hr className="my-5" />

            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">                
                <div className="flex flex-grow p-4 justify-between items-center mb-4">
                    <span className="text-gray-700">Total:</span>
                    <span className="text-gray-700">${cart.reduce((total : number, item: any) => total + item.product.price * item.quantity, 0)}</span>
                </div>
            </div>


            <main className="flex-1 bg-gray-100 py-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    { !user &&  
                        <div className="bg-white shadow-md rounded-lg p-8">
                            <h2 className="text-2xl font-semibold mb-6">What's next?</h2>
                            <h3 className="text-1xl font-semibold mb-6">You must login to proceed with your order</h3>
                            <div>
                                <NavLink to="/login" className="text-blue-700 font-bold">
                                    Click here to login
                                </NavLink>
                            </div>
                        </div>
                    }

                    { user &&
                        <div className="bg-white shadow-md rounded-lg p-8">
                            <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

                            <form className="space-y-4" onSubmit={triggerPayment}>
                                <div>
                                    <h3 className="text-1xl font-semibold mb-6">Full Name</h3>
                                    <span className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        { user?.name}
                                    </span>
                                    <h3 className="text-1xl font-semibold mb-6">Email</h3>
                                    <span className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        { user?.email}
                                    </span>
                                    <h3 className="text-1xl font-semibold mb-6">Address</h3>
                                    <span className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        { user?.address}
                                    </span>
                                    <h3 className="text-1xl font-semibold mb-6">Phone</h3>
                                    <span className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        { user?.phone}
                                    </span>
                                    
                                </div>

                                <div className="flex justify-end">
                                    <button
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"                                    
                                    >
                                    Place Order
                                    </button>
                                </div>
                            </form>
                        </div>
                    }

                </div>
            </main>

        </div>
    );
};


export default connect()(Cart);