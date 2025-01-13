import React from "react";
import { useAdmin } from "../../context/AdminContext";

const AdminAppointmentsList = () => {
    const { appointments, adminDeleteAppointment } = useAdmin();
    const handleDelete = async (id) => {
        await adminDeleteAppointment(id);
    }
    return (
        <div className="p-6 mt-12 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Manage appointments</h2>
            {appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-2 text-left">Service</th>
                            <th className="p-2 text-left">Customer</th>
                            <th className="p-2 text-left">Provider</th>
                            <th className="p-2 text-left">Status</th>
                            <th className="p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment._id} className="border-b">
                                <td className="p-2">
                                    <div>
                                        <strong className={`${!appointment.service ? 'text-yellow-500 italic' : ''}`}>{appointment.service?.title || 'Service not available!'}</strong>
                                        <p className="text-sm text-gray-500">{appointment.service?.description}</p>
                                    </div>
                                </td>
                                <td className="p-2">
                                    <div>
                                        <strong className={`${!appointment.customer ? 'text-red-500 italic' : ''}`}>{appointment.customer?.name || 'Customer does not exist!'}</strong>
                                        <p className="text-sm text-gray-500">{appointment.customer?.email}</p>
                                    </div>
                                </td>
                                <td className="p-2">
                                    <div>
                                        <strong className={`${!appointment.provider ? 'text-red-500 italic' : ''}`}>{appointment.provider?.name || 'Provider does not exist!'}</strong>
                                        <p className="text-sm text-gray-500">{appointment.provider?.email}</p>
                                    </div>
                                </td>
                                <td className="p-2">
                                    <strong
                                        className={`${appointment.status === 'Booked' ? 'text-blue-500 ' : appointment.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}
                                    >
                                        {appointment.status}
                                    </strong>
                                </td>
                                <td className="p-2 text-center">
                                    <button onClick={() => handleDelete(appointment._id)} className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default AdminAppointmentsList