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
        <div className="max-w-5xl mx-auto p-4 space-y-6">
            <h2 className="text-2xl font-bold text-center">All Appointments</h2>

            <div className="flex justify-between items-center mb-4">
                <div>
                    <label htmlFor="status" className="text-lg font-medium">Filter by Status</label>
                    <select
                        id="status"
                        className="ml-2 p-2 border border-gray-300 rounded"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option value="Booked">Booked</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>
            </div>

            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="text-left px-4 py-2 border-b">Service</th>
                        <th className="text-left px-4 py-2 border-b">Customer</th>
                        <th className="text-left px-4 py-2 border-b">Provider</th>
                        <th className="text-left px-4 py-2 border-b">Status</th>
                        <th className="text-left px-4 py-2 border-b">Date/Time</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                                No appointments found.
                            </td>
                        </tr>
                    ) : (
                        filteredAppointments.map(appointment => (
                            <tr key={appointment._id} onClick={() => navigate(`/appointments/${appointment._id}`)} className='cursor-pointer hover:bg-gray-100'>
                                <td className="px-4 py-2 border-b">
                                    <div>
                                        <strong className={`${!appointment.service ? 'text-yellow-500 italic' : ''}`}>{appointment.service?.title || 'Service not available!'}</strong>
                                        <p className="text-sm text-gray-500">{appointment.service?.description}</p>
                                    </div>
                                </td>
                                <td className="px-4 py-2 border-b">
                                    <div>
                                        <strong className={`${!appointment.customer ? 'text-yellow-500 italic' : ''}`}>{appointment.customer?.name || 'User does not exist!'}</strong>
                                        <p className="text-sm text-gray-500">{appointment.customer?.email}</p>
                                    </div>
                                </td>
                                <td className="px-4 py-2 border-b">
                                    <div>
                                        <strong className={`${!appointment.provider ? 'text-yellow-500 italic' : ''}`}>{appointment.provider?.name || 'User does not exist!'}</strong>
                                        <p className="text-sm text-gray-500">{appointment.provider?.email}</p>
                                    </div>
                                </td>
                                <td className="px-4 py-2 border-b">
                                    <span
                                        className={`px-3 py-1 rounded-full ${appointment.status === 'Booked' ? 'bg-blue-500 text-white' : appointment.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                                    >
                                        {appointment.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border-b uppercase">{new Date(appointment.dateTime).toLocaleString('en-GB', { month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Appointments;
