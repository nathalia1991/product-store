'use client'
import axios from 'axios';
const baseURL = '/api'; // Replace with your API base URL

const api = axios.create({
  baseURL,
});

export const fetchUser = (token: string, setValue: any) => {
  try {
    api.get('/user', {headers: {auth_token : token}})
        .then(response => {
          console.log(response)
          setValue(response.data)
        });
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const registerUser = (data: any, onSuccess: any, onError: any) => {
  try {
    api.post('/user', data)
        .then(response => {
          if (response.status === 200) {            
            onSuccess(response.data);
          } else {
            onError();
          }
        });
  } catch (error) {
    onError();
  }
};
