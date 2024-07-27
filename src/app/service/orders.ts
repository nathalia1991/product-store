'use client'
import axios from 'axios';
const baseURL = '/api'; // Replace with your API base URL

const api = axios.create({
  baseURL,
});

export const fetchOrders = (token: string, setValue: any) => {
  try {
    api.get('/orders', {headers: {auth_token : token}})
        .then(response => {
          setValue(response.data)
        });
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
};
