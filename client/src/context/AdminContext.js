import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { deleteAppointment, deleteService, deleteUser, getAllAppointments, getAllServices, getAllUsers } from '../utils/adminApi';
import { useBanner } from './BannerContext';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const { token, user } = useAuth();
    const { showMessage } = useBanner();
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (token && user?.role === 'admin') {
            adminGetUsers();
            adminGetServices();
            adminGetAppointments();
        }
    }, [token, user?.role])

    const adminGetUsers = async () => {
        if (!token || user?.role !== 'admin') return;
        try {
            const response = await getAllUsers(token);
            setUsers(response.data);
        } catch (error) {
            console.log('Error fetching users', error);
            showMessage(error.response.data.message, 'error');
        }
    }

    const adminGetServices = async () => {
        try {
            const response = await getAllServices(token);
            setServices(response.data);
        } catch (error) {
            console.log('Error fetching services', error);
            showMessage(error.response.data.message, 'error');
        }
    }

    const adminGetAppointments = async () => {
        try {
            const response = await getAllAppointments(token);
            setAppointments(response.data);
        } catch (error) {
            console.log('Error fetching appointments', error);
            showMessage(error.response.data.message, 'error');
        }
    }

    const adminDeleteUser = async (id) => {
        try {
            const response = await deleteUser(token, id);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            showMessage(response.data.message, 'success');
        } catch (error) {
            console.log('Error deleting user', error);
            showMessage(error.response.data.message, 'error');
        }
    }

    const adminDeleteService = async (id) => {
        try {
            const response = await deleteService(token, id)
            setServices((prevServices) => prevServices.filter((service) => service._id !== id));
            showMessage(response.data.message, 'success');
        } catch (error) {
            console.log('Error deleting service', error);
            showMessage(error.response.data.message, 'error');
        }
    }

    const adminDeleteAppointment = async (id) => {
        try {
            const response = await deleteAppointment(token, id)
            setAppointments((prevAppointments) => prevAppointments.filter((appointment) => appointment._id !== id));
            showMessage(response.data.message, 'success');
        } catch (error) {
            console.log('Error deleting appointment', error);
            showMessage(error.response.data.message, 'error');
        }
    }


    return (
        <AdminContext.Provider value={{ users, adminDeleteUser, services, adminDeleteService, appointments, adminDeleteAppointment }}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => useContext(AdminContext);