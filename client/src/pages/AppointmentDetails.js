import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAppointmentById } from "../utils/appointmentApi";
import { useAppointment } from "../context/AppointmentContext";

const AppointmentDetails = () => {
    const { id } = useParams();
    const { token, user } = useAuth();
    const { updateAppointment } = useAppointment();
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleStatus = async (id, status) => {
        await updateAppointment(id, status);
    }

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                setLoading(true);
                const response = await getAppointmentById(token, id);
                setAppointment(response.data);
            } catch (error) {
                console.log('Error fetching appointment', error);
                setError(error.response.data.message);
            } finally {
                setLoading(false);
            }
        }
        fetchAppointment();
    }, [id, token]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
                    <p className="text-gray-600 font-medium">Loading appointment details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-lg mx-4">
                    <div className="flex items-center space-x-3">
                        <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch(status) {
            case 'Booked':
                return 'bg-blue-100 text-blue-800 ring-blue-600/20';
            case 'Completed':
                return 'bg-green-100 text-green-800 ring-green-600/20';
            case 'Canceled':
                return 'bg-red-100 text-red-800 ring-red-600/20';
            default:
                return 'bg-gray-100 text-gray-800 ring-gray-600/20';
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 backdrop-blur-lg backdrop-filter">
                    <div className="px-8 py-10">
                        <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Appointment Details</h2>
                                <p className="text-gray-500">Reference ID: {appointment._id}</p>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ring-1 ring-inset ${getStatusColor(appointment.status)}`}>
                                {appointment.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-medium text-gray-500">Customer</p>
                                </div>
                                <p className="text-xl font-semibold text-gray-900">{appointment.customer?.name}</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-medium text-gray-500">Provider</p>
                                </div>
                                <p className="text-xl font-semibold text-gray-900">{appointment.provider?.name}</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-medium text-gray-500">Service</p>
                                </div>
                                <p className="text-xl font-semibold text-gray-900">{appointment.service?.title}</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 bg-amber-100 rounded-lg">
                                        <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-medium text-gray-500">Date & Time</p>
                                </div>
                                <p className="text-xl font-semibold text-gray-900">
                                    {new Date(appointment.dateTime).toLocaleString('en-GB', { 
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                        timeZone: 'UTC'
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center items-center space-x-4 pt-6 border-t border-gray-100">
                            {user.role === 'provider' && appointment.status === 'Booked' && (
                                <button 
                                    onClick={() => handleStatus(appointment._id, 'Completed')} 
                                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl shadow-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Mark as Completed</span>
                                </button>
                            )}
                            {appointment.status === 'Booked' && (
                                <button 
                                    onClick={() => handleStatus(appointment._id, 'Canceled')} 
                                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-xl shadow-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span>Cancel Appointment</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentDetails;