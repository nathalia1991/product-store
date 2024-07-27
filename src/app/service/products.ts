'use client'
import axios from 'axios';
const baseURL = '/api'; // Replace with your API base URL

const api = axios.create({
  baseURL,
});

export const fetchProducts = (setValue: any) => {
  try {
    api.get('/products').then(response => setValue(response.data));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};


export const fetchProduct = (id : number, setValue : any) => {
  try {
    api.get('/products/' + id).then(response => setValue(response.data));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};