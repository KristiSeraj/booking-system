import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { bookAppointment, getAllAppointments } from "../utils/appointmentApi";
import { useBanner } from "./BannerContext";
import { useServices } from "./ServiceContext";

const AppointmentContext = createContext();

export const AppointmentProvider = ({children}) => {
    const { token, user } = useAuth();
    const { showMessage } = useBanner();
    const { setServices } = useServices();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (token && user?.role !== 'admin') {
            getAppointments()
        }
    }, [token, user?.role])

    const getAppointments = async () => {
        if (!token) {
            showMessage('Token is not available. Please log in again.', 'error');
            return;
        }
        try {
            const response = await getAllAppointments(token);
            setAppointments(response.data);
        } catch (error) {
            console.log('Error fetching appointments', error);
            showMessage(error.response.data.message, 'error');
        }
    };

    const bookNewAppointment = async (serviceId, slotId) => {
        try {
            const response = await bookAppointment(token, serviceId, slotId);
            setAppointments((prevState) => [...prevState, response.data.appointment]);
            setServices((prevServices) =>
                prevServices.map((service) =>
                    service._id === serviceId
                        ? {
                            ...service,
                            availableSlots: service.availableSlots.map((slot) =>
                                slot._id === slotId ? { ...slot, isBooked: true } : slot
                            )
                        }
                        : service
                )
            );
            showMessage(response.data.message, 'success');
        } catch (error) {
            console.log('Error booking an appointment', error);
            showMessage(error.response.data.message, 'error');
        }
    }
    return (
        <AppointmentContext.Provider value={{ appointments, bookNewAppointment, getAppointments }}>
            {children}
        </AppointmentContext.Provider>
    )
}

export const useAppointment = () => useContext(AppointmentContext);