import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const bookAppointment = async (token, serviceId, slotId) => await axios.post(`${baseUrl}/api/appointment/book/${serviceId}/${slotId}`, {}, { headers: { 'x-auth-token': token }});
export const getAllAppointments = async (token) => await axios.get(`${baseUrl}/api/appointment/all`, { headers: { 'x-auth-token': token }});
export const getAppointmentById = async (token, id) => await axios.get(`${baseUrl}/api/appointment/${id}`, { headers: { 'x-auth-token': token }});
export const changeAppointmentStatus = async (token, appointmentId, status) => await axios.patch(`${baseUrl}/api/appointment/${appointmentId}`, { status }, { headers: { 'x-auth-token': token }})