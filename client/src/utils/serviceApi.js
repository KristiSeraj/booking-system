import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const createService = async (token, title, description) => await axios.post(`${baseUrl}/api/service`, { title, description }, { headers: { 'x-auth-token': token }});
export const getServiceById = async (id, token) => await axios.get(`${baseUrl}/api/service/${id}`, { headers: { 'x-auth-token': token }});
export const getAllProvidersAndServices = async (token) => await axios.get(`${baseUrl}/api/service/providers/all`, { headers: { 'x-auth-token': token }});
export const getServices = async (token) => await axios.get(`${baseUrl}/api/service`, { headers: { 'x-auth-token': token }});
export const editService = async (id, token, title, description) => await axios.put(`${baseUrl}/api/service/${id}`, { title, description }, { headers: { 'x-auth-token': token }});
export const deleteServiceById = async (id, token) => await axios.delete(`${baseUrl}/api/service/${id}`, { headers: { 'x-auth-token': token }});
export const createSlot = (id, token, dateTime) => axios.post(`${baseUrl}/api/service/${id}/slot`, { dateTime }, { headers: { 'x-auth-token': token }});
export const editSlot = (serviceId, slotId, token, dateTime) => axios.put(`${baseUrl}/api/service/${serviceId}/slot/${slotId}`, { dateTime }, { headers: { 'x-auth-token': token }});
export const deleteSlot = (serviceId, slotId, token) => axios.delete(`${baseUrl}/api/service/${serviceId}/slot/${slotId}`, { headers: { 'x-auth-token': token }});