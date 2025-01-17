import React, { useState, useEffect } from 'react';
import { useAppointment } from '../context/AppointmentContext';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
    const navigate = useNavigate();
    const { appointments } = useAppointment();
    const [statusFilter, setStatusFilter] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState(appointments);

    useEffect(() => {
        if (statusFilter) {
            setFilteredAppointments(appointments.filter(appointment => appointment.status === statusFilter));
        } else {
            setFilteredAppointments(appointments);
        }
    }, [appointments, statusFilter]);

    return (
        <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">Appointments Overview</h2>
                    <p className="mt-2 sm:mt-3 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-500">
                        Manage and track all your appointments in one place
                    </p>
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
                    <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-3">
                                <label htmlFor="status" className="text-base sm:text-lg font-medium text-gray-700">Filter by Status:</label>
                                <div className="w-full sm:w-auto flex gap-2">
                                    {['', 'Booked', 'Completed', 'Canceled'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => setStatusFilter(status)}
                                            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 
                                                ${statusFilter === status ? 
                                                    'bg-blue-600 text-white' : 
                                                    'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
                                        >
                                            {status || 'All'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full align-middle">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                        <th scope="col" className="hidden sm:table-cell px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                        <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                                        <th scope="col" className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredAppointments.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-4 sm:px-6 py-8 sm:py-12 text-center text-gray-500">
                                                <p className="text-base sm:text-lg font-medium">No appointments found</p>
                                                <p className="text-xs sm:text-sm mt-1">Try adjusting your filters or check back later</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredAppointments.map(appointment => (
                                            <tr 
                                                key={appointment._id} 
                                                onClick={() => navigate(`/appointments/${appointment._id}`)} 
                                                className="hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                                            >
                                                <td className="px-4 sm:px-6 py-3 sm:py-4">
                                                    <div className="flex flex-col">
                                                        <span className={`text-xs sm:text-sm font-medium ${!appointment.service ? 'text-yellow-600 italic' : 'text-gray-900'}`}>
                                                            {appointment.service?.title || 'Service not available!'}
                                                        </span>
                                                        <span className="hidden sm:block text-xs sm:text-sm text-gray-500 truncate max-w-[200px] lg:max-w-xs">
                                                            {appointment.service?.description}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="hidden sm:table-cell px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className={`text-xs sm:text-sm font-medium ${!appointment.customer ? 'text-yellow-600 italic' : 'text-gray-900'}`}>
                                                            {appointment.customer?.name || 'User does not exist!'}
                                                        </span>
                                                        <span className="text-xs sm:text-sm text-gray-500">{appointment.customer?.email}</span>
                                                    </div>
                                                </td>
                                                <td className="hidden md:table-cell px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className={`text-xs sm:text-sm font-medium ${!appointment.provider ? 'text-yellow-600 italic' : 'text-gray-900'}`}>
                                                            {appointment.provider?.name || 'User does not exist!'}
                                                        </span>
                                                        <span className="text-xs sm:text-sm text-gray-500">{appointment.provider?.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 sm:px-6 py-3 sm:py-4">
                                                    <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium
                                                        ${appointment.status === 'Booked' ? 'bg-blue-100 text-blue-800' : 
                                                        appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                                        'bg-red-100 text-red-800'}`}>
                                                        {appointment.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">
                                                    {new Date(appointment.dateTime).toLocaleString('en-GB', { 
                                                        month: '2-digit', 
                                                        day: '2-digit', 
                                                        year: '2-digit', 
                                                        hour: '2-digit', 
                                                        minute: '2-digit', 
                                                        hour12: true,
                                                        timeZone: 'UTC'
                                                    })}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointments;
