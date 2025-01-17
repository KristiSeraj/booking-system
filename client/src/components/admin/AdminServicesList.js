import React from "react";
import { useAdmin } from "../../context/AdminContext";

const AdminServicesList = () => {
    const { services, adminDeleteService } = useAdmin();
    const handleDelete = async (id) => {
        await adminDeleteService(id);
    }
    return (
        <div className="p-4 sm:p-6 mt-8 sm:mt-12 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Manage Services</h2>
                <span className="text-sm text-gray-500">{services.length} total services</span>
            </div>
            {services.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No services found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Description</th>
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                                <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {services.map((service) => (
                                <tr key={service._id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="p-3 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{service.title}</div>
                                    </td>
                                    <td className="p-3 whitespace-nowrap hidden md:table-cell">
                                        <div className="text-sm text-gray-900">
                                            {service.description.length > 100 
                                                ? `${service.description.substring(0, 100)}...` 
                                                : service.description}
                                        </div>
                                    </td>
                                    <td className="p-3 whitespace-nowrap">
                                        <div>
                                            <strong className={`text-sm font-medium ${!service.provider ? 'text-red-500 italic' : 'text-gray-900'}`}>
                                                {service.provider?.name || 'Provider does not exist!'}
                                            </strong>
                                            <p className="text-xs text-gray-500 mt-1">{service.provider?.email}</p>
                                        </div>
                                    </td>
                                    <td className="p-3 whitespace-nowrap text-center">
                                        <button 
                                            onClick={() => handleDelete(service._id)} 
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

export default AdminServicesList