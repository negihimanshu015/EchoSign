import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export const predictSign = (formData) => api.post('/predict', formData);