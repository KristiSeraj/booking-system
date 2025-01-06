import React, {createContext, useContext, useEffect, useState} from 'react';
import {getAuth, registerUser} from "../utils/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAuthUser = async () => {
        try {
            const token = localStorage.getItem("token");
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

    useEffect(() => {
        fetchAuthUser();
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
        <AuthContext.Provider value={{ user, token, login, logout, register, loading }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);