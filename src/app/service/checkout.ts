'use client'
import axios from 'axios';
const baseURL = '/api'; // Replace with your API base URL

const api = axios.create({
  baseURL,
});

export const checkoutOrder = (body: any, token: string, onSuccess: any) => {
  try {

    api.post('/checkout', body, {headers: {auth_token : token}})
        .then(response => {
          if (response.status === 200) {
            onSuccess(response.data)
          }
        });
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};
