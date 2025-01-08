import React, {createContext, useContext, useEffect, useState} from 'react';
import { useAuth } from "./AuthContext";
import {getAllProvidersAndServices, getServices, deleteServiceById, editService, createService } from "../utils/serviceApi";
import {useBanner} from "./BannerContext";

const ServiceContext = createContext();

const ROLES = {
    ADMIN: 'admin',
    PROVIDER: 'provider',
    CUSTOMER: 'customer',
}

export const ServiceProvider = ({ children }) => {
    const { user, token } = useAuth();
    const [services, setServices] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setServices([])
        }
        if (user?.role) {
            getServicesByRole()
        }
    }, [user?.role]);

    const getServicesByRole = async () => {
        if (!user || !token) return;
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

    const createNewService = async (title, description) => {
        try {
            const response = await createService(token, title, description);
            const newService = response.data;
            setServices((prevState) => ({
                ...prevState,
                services: [ ...prevState.services, newService ]
            }));
        } catch (error) {
            console.log('Error creating service', error.response.data.error);
            setError(error.response.data.error);
        }
    }

    const deleteService = async (id) => {
        try {
            await deleteServiceById(id, token);
            setServices((prevState) => ({
                ...prevState,
                services: prevState.services.filter((service) => service._id !== id)
            }))
        } catch (error) {
            console.log('Error deleting service', error);
            setError(error.message);
        }
    }

    const updateService = async (id, title, description) => {
        try {
            const response = await editService(id, token, title, description);
            const updatedService = response.data.service;
            setServices((prevState) => ({
                ...prevState,
                services: prevState.services.map((service) =>
                    service._id === updatedService._id ? updatedService : service
                ),
            }));
        } catch (error) {
            console.log('Error updating service', error);
            setError(error.message);
        }
    }


    return (
        <ServiceContext.Provider value={{ services, error, loading, deleteService, updateService, createNewService }}>
            {children}
        </ServiceContext.Provider>
    )
}

export const useServices = () => useContext(ServiceContext);