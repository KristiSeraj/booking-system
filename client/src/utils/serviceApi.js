import axios from 'axios';

const baseUrl = 'http://localhost:8080/api';

export const createService = (title, description) => axios.post(`${baseUrl}/service`, { title, description });
export const getService = () => axios.get(`${baseUrl}/service/:id`);
export const getAllProvidersAndServices = (token) => axios.get(`${baseUrl}/service/providers/all`, { headers: { 'x-auth-token': token }});
export const getServices = (token) => axios.get(`${baseUrl}/service`, { headers: { 'x-auth-token': token }});
export const editService = (title) => axios.post(`${baseUrl}/service/:id`, { title });
export const createSlot = (dateTime) => axios.post(`${baseUrl}/service/:id/slot`, { dateTime});
export const editSlot = (dateTime) => axios.put(`${baseUrl}/service/:serviceId/slot/:slotId`, { dateTime });
export const deleteSlot = () => axios.delete(`${baseUrl}/service/:serviceId/slot/:slotId`);