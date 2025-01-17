import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const getAllUsers = async (token) => await axios.get(`${baseUrl}/api/admin/users`, { headers: { 'x-auth-token': token }});
export const getAllAppointments = async (token) => await axios.get(`${baseUrl}/api/admin/appointments`, { headers: { 'x-auth-token': token }});
export const getAllServices = async (token) => await axios.get(`${baseUrl}/api/admin/services`, { headers: { 'x-auth-token': token }});
export const deleteUser = async (token, id) => await axios.delete(`${baseUrl}/api/admin/users/${id}`, { headers: { 'x-auth-token': token }});
export const deleteAppointment = async (token, id) => await axios.delete(`${baseUrl}/api/admin/appointments/${id}`, { headers: { 'x-auth-token': token }});
export const deleteService = async (token, id) => await axios.delete(`${baseUrl}/api/admin/services/${id}`, { headers: { 'x-auth-token': token }});