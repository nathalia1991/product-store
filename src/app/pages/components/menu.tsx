import { fetchUser } from '@/app/service/user';
import { cleanToken } from '@/app/store/auth/slice';
import { cleanCart } from '@/app/store/cart/slice';
import { cleanOrders } from '@/app/store/order-history/slice';
import { cleanUser } from '@/app/store/user/slice';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

const Menu: React.FC = () => {

  const user = useSelector((state: any) => {
      return state.user.user;
  });

  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">My App</div>
        <div className="flex space-x-4">
          <NavLink to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
            Home
          </NavLink>
          {!user && 
            <NavLink to="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
              Login
            </NavLink>
          }
          {user && 
            <NavLink to="/profile" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
              Profile
            </NavLink>
          }
          <NavLink to="/cart" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
            Cart
          </NavLink>
          <NavLink to="/about" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
            About
          </NavLink>
          <NavLink to="/contact" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
            Contact
          </NavLink>
          {user && 
            <button
              className="text-white hover:bg-gray-700 px-3 py-2 rounded"
              onClick={() => {
                dispatch(cleanCart({}))                
                dispatch(cleanOrders({}))              
                dispatch(cleanUser({}))
                dispatch(cleanToken({}))

                navigate('/')
              }}
              >
              Logout
            </button>
          }
        </div>
      </div>
    </nav>
  );
};

export default Menu;