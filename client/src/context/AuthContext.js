import React, {createContext, useEffect, useState} from 'react';
import {registerUser} from "../utils/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
        }
    }, []);
    const login = (userData, authToken) => {
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
            return response;
        } catch (error) {
            console.log('Registration failed!', error);
        }
    }
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
    return (
        <AuthContext.Provider value={{ user, token, login, logout, register }}>
            { children }
        </AuthContext.Provider>
    )
}