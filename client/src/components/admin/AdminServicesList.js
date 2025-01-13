import React from "react";
import { useAdmin } from "../../context/AdminContext";

const AdminServicesList = () => {
    const { services, adminDeleteService } = useAdmin();
    const handleDelete = async (id) => {
        await adminDeleteService(id);
    }
    return (
        <div className="p-6 mt-12 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Manage services</h2>
            {services.length === 0 ? (
                <p>No services found.</p>
            ) : (
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-2 text-left">Title</th>
                            <th className="p-2 text-left">Description</th>
                            <th className="p-2 text-left">Provider</th>
                            <th className="p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr key={service._id} className="border-b">
                                <td className="p-2">{service.title}</td>
                                <td className="p-2">{service.description}</td>
                                <td className={`p-2 ${!service.provider?.name ? "text-red-500 font-semibold italic" : ''}`}>{service.provider?.name || 'User does not exist!'}</td>
                                <td className="p-2 text-center">
                                    <button onClick={() => handleDelete(service._id)} className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600">
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

export default AdminServicesList