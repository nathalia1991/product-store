'use client'
import { fetchUser } from '@/app/service/user';
import { setUser } from '@/app/store/user/slice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import  { useNavigate }  from 'react-router-dom';
import { toast } from 'react-toastify';
import Dashboard from './history/dashboard';


const Profile = () => {

    
    const dispatch = useDispatch();

    const user = useSelector((state: any) => {
        return state.user.user;
    });

    const token = useSelector((state: any) => {
        return state.token.token;
    });

    useEffect(() => {
        const retrieveUser = () => {
          try {
            fetchUser(token, (data: any) => {dispatch(setUser(data))});
          } catch (error) {
            // Handle error
          }
        };
        retrieveUser();
      }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            { !user && 
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            }
            {
                user && 
                <div className="w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-left text-3xl font-extrabold text-gray-900 p-4">Welcome, {user.name}</h2>
                        <p className="text-1xl font-semibold mb-6">Thanks for using our page for your favorite transactions, please select the option you want to proceed
                        </p>
                        <div>
                            
                            <NavLink to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Back to home
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to="/cart" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Go to checkout
                            </NavLink>
                        </div>
                    </div>
                    
                    <div>
                        <Dashboard />
                    </div>

                </div>
            }

        </div>
    );
};

export default connect()(Profile);