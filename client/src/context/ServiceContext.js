import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from "./AuthContext";
import { getAllProvidersAndServices, getServices, deleteServiceById, editService, createService, createSlot, getServiceById, deleteSlot, editSlot } from "../utils/serviceApi";
import { useBanner } from "./BannerContext";

const ServiceContext = createContext();

const ROLES = {
    ADMIN: 'admin',
    PROVIDER: 'provider',
    CUSTOMER: 'customer',
}

export const ServiceProvider = ({ children }) => {
    const { user, token } = useAuth();
    const { showMessage } = useBanner();
    const [services, setServices] = useState([]);
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
            showMessage(error.response.data.error, 'error')
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
            showMessage(error.response.data.error, 'error')
        }
    }

    const deleteService = async (id) => {
        try {
            const response = await deleteServiceById(id, token);
            setServices((prevState) => ({
                ...prevState,
                services: prevState.services.filter((service) => service._id !== id)
            }))
            showMessage(response.data.message, 'success')
        } catch (error) {
            console.log('Error deleting service', error);
            showMessage(error.response.data.error, 'error');
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
            showMessage(response.data.message, 'success')
        } catch (error) {
            console.log('Error updating service', error);
            showMessage(error.response.data.error, 'error');
        }
    }

    const createNewSlot = async (id, dateTime) => {
        try {
            const response = await createSlot(id, token, dateTime);
            const updatedService = await getServiceById(id, token);
            setServices((prevState) => ({
                ...prevState,
                services: prevState.services.map((service) => service._id === updatedService._id ? updatedService : service)
            }))
            showMessage(response.data.message, 'success');
        } catch (error) {
            console.log('Error creating slot', error);
            showMessage(error.response.data.error, 'error');
        }
    }

    const updateSlot = async (serviceId, slotId, dateTime) => {
        try {
            const response = await editSlot(serviceId, slotId, token, dateTime);
            const updatedService = await getServiceById(serviceId, token);
            setServices((prevState) => ({
                ...prevState,
                services: prevState.services.map((service) => service._id === updatedService._id ? updatedService : service)
            }))
            showMessage(response.data.message, 'success');
        } catch (error) {
            console.log('Error updating slot', error);
            showMessage(error.response.data.error, 'error')
        }
    }

    const deleteSlotById = async (serviceId, slotId) => {
        try {
            const response = await deleteSlot(serviceId, slotId, token);
            const updatedService = await getServiceById(serviceId, token);
            setServices((prevState) => ({
                ...prevState,
                services: prevState.services.map((service) => service._id === updatedService._id ? updatedService : service)
            }));
            showMessage(response.data.message, 'success');
        } catch (error) {
            console.log('Error deleting slot', error);
            showMessage(error.response.data.error, 'error');
        }
    }

    return (
        <ServiceContext.Provider value={{ services, setServices, loading, deleteService, updateService, createNewService, createNewSlot, deleteSlotById, updateSlot }}>
            {children}
        </ServiceContext.Provider>
    )
}

export const useServices = () => useContext(ServiceContext);