import React from "react";
import { useAdmin } from "../../context/AdminContext";

const AdminAppointmentsList = () => {
    const { appointments, adminDeleteAppointment } = useAdmin();
    const handleDelete = async (id) => {
        await adminDeleteAppointment(id);
    }
    return (
        <div className="p-4 sm:p-6 mt-8 sm:mt-12 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Manage Appointments</h2>
                <span className="text-sm text-gray-500">{appointments.length} total appointments</span>
            </div>
            {appointments.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No appointments found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Customer</th>
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Provider</th>
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {appointments.map((appointment) => (
                                <tr key={appointment._id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="p-3 whitespace-nowrap">
                                        <div>
                                            <strong className={`text-sm font-medium ${!appointment.service ? 'text-yellow-500 italic' : 'text-gray-900'}`}>
                                                {appointment.service?.title || 'Service not available!'}
                                            </strong>
                                            <p className="text-xs text-gray-500 mt-1">{appointment.service?.description}</p>
                                        </div>
                                    </td>
                                    <td className="p-3 whitespace-nowrap hidden sm:table-cell">
                                        <div>
                                            <strong className={`text-sm font-medium ${!appointment.customer ? 'text-red-500 italic' : 'text-gray-900'}`}>
                                                {appointment.customer?.name || 'Customer does not exist!'}
                                            </strong>
                                            <p className="text-xs text-gray-500 mt-1">{appointment.customer?.email}</p>
                                        </div>
                                    </td>
                                    <td className="p-3 whitespace-nowrap hidden md:table-cell">
                                        <div>
                                            <strong className={`text-sm font-medium ${!appointment.provider ? 'text-red-500 italic' : 'text-gray-900'}`}>
                                                {appointment.provider?.name || 'Provider does not exist!'}
                                            </strong>
                                            <p className="text-xs text-gray-500 mt-1">{appointment.provider?.email}</p>
                                        </div>
                                    </td>
                                    <td className="p-3 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            appointment.status === 'Booked' ? 'bg-blue-100 text-blue-800' :
                                            appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {appointment.status}
                                        </span>
                                    </td>
                                    <td className="p-3 whitespace-nowrap text-center">
                                        <button 
                                            onClick={() => handleDelete(appointment._id)} 
                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AdminAppointmentsList