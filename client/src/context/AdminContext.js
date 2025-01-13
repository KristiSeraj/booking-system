import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { deleteUser, getAllUsers } from '../utils/adminApi';
import { useBanner } from './BannerContext';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const { token, user } = useAuth();
    const { showMessage } = useBanner();
    const [users, setUsers] = useState([]);

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

    useEffect(() => {
        if (token && user?.role === 'admin') {
            adminGetUsers();
        }
    }, [token, user?.role])

    return (
        <AdminContext.Provider value={{ users, adminGetUsers, adminDeleteUser }}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => useContext(AdminContext);