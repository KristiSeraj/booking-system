import React, {createContext, useContext, useEffect, useState} from 'react';
import { useAuth } from "./AuthContext";
import {getAllProvidersAndServices, getServices} from "../utils/serviceApi";

const ServiceContext = createContext();

const ROLES = {
    ADMIN: 'admin',
    PROVIDER: 'provider',
    CUSTOMER: 'customer',
}

export const ServiceProvider = ({ children }) => {
    const { user, token } = useAuth();
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const getServicesByRole = async () => {
        try {
            let response;
            setLoading(true);
            if (user?.role === ROLES.PROVIDER) {
                response = await getServices(token);
            } else {
                response = await getAllProvidersAndServices(token);
            }
            setServices(response.data);
        } catch (error) {
            console.log('Error fetching service provider', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (user?.role) {
            getServicesByRole()
        }
    }, [user?.role]);

    return (
        <ServiceContext.Provider value={{ services, error, loading }}>
            {children}
        </ServiceContext.Provider>
    )
}

export const useServices = () => useContext(ServiceContext);