import axios from 'axios';

const baseUrl = 'http://localhost:8080/api';

export const bookAppointment = async (token, serviceId, slotId) => await axios.post(`${baseUrl}/appointment/book/${serviceId}/${slotId}`, {}, { headers: { 'x-auth-token': token }});
export const getAllAppointments = async (token) => await axios.get(`${baseUrl}/appointment/all`, { headers: { 'x-auth-token': token }});
export const getAppointmentById = async (token, appoinmentId) => await axios.get(`${baseUrl}/appoinment/${appoinmentId}`, { headers: { 'x-auth-token': token }});