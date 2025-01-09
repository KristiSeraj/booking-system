import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, registerUser, updateUser } from "../utils/authApi";
import { useBanner } from './BannerContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const { showMessage } = useBanner();

    const fetchAuthUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }
            const response = await getAuth(token);
            if (response?.data) {
                setUser(response.data);
                setToken(token)
            }
            setLoading(false);
        } catch (error) {
            console.log('Error fetching user', error);
            logout();
            setLoading(false);
        }
    }

    const updateAuthUser = async (name) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }
            const response = await updateUser(name, token);
            if (response?.data) {
                setUser({ ...user, name: response.data.user.name})
                setToken(token);
            }
            setLoading(false);
            showMessage(response.data.message, 'success')
        } catch (error) {
            console.log('Error updating user', error);
            setLoading(false);
            showMessage(error.response.data.message, 'error')
        }
    }

    useEffect(() => {
        fetchAuthUser();
    }, []);

    const login = (userData, authToken) => {
        if (!userData || !authToken) return;
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken);
    }

    const register = async (name, email, password, role) => {
        try {
            const response = await registerUser(name, email, password, role);
            const { user, token } = response.data;
            login(user, token);
            showMessage(response.data.message, 'success');
            return response;
        } catch (error) {
            console.log('Registration failed!', error);
            setLoading(false);
            showMessage(error.response.data.message, 'error')
        }
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
    return (
        <AuthContext.Provider value={{ user, token, login, logout, register, loading, updateAuthUser }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);