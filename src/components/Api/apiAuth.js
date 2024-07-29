import axios from 'axios';


export const api = axios.create({
  baseURL: 'https://connections-api.goit.global/users',
});

export const setToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
export const clearToken = () => {
  delete api.defaults.headers.common['Authorization'];
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});