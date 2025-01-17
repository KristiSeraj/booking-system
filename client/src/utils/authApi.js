import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const loginUser = (email, password) => axios.post(`${baseUrl}/api/auth/login`, { email, password });
export const registerUser = (name, email, password, role) => axios.post(`${baseUrl}/api/auth/register`, { name, email, password, role });
export const getAuth = (token) => axios.get(`${baseUrl}/api/auth`, { headers: { 'x-auth-token': token }});
export const updateUser = (name, token) => axios.put(`${baseUrl}/api/auth`, { name }, { headers: { 'x-auth-token': token }});
