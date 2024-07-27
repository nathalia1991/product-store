'use client'
import axios from 'axios';
const baseURL = '/api'; // Replace with your API base URL

const api = axios.create({
  baseURL,
});

export const login = (body: any, setToken: any, onError: any, onSuccess: any) => {
  try {
    api.post('/auth/login', body).then(response => {
      if (response.status == 200) {
        setToken(response.data);
        onSuccess();
      } else {
        onError();
      }
    });
  } catch (error) {
    console.error('Error during login execution:', error);
    onError();
  }
};
