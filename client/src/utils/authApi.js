import axios from 'axios';

const baseUrl = 'http://localhost:8080/api';

export const loginUser = (email, password) => axios.post(   `${baseUrl}/auth/login`, { email, password });
export const registerUser = (name, email, password, role) => axios.post(`${baseUrl}/auth/register`, { name, email, password, role });