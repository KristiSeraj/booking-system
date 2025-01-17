import React from "react";
import { useAdmin } from "../../context/AdminContext";

const AdminUsersList = () => {
    const { users, adminDeleteUser } = useAdmin();
    const handleDelete = async (id) => {
        await adminDeleteUser(id);
    }
    return (
        <div className="p-4 sm:p-6 mt-8 sm:mt-12 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Manage Users</h2>
                <span className="text-sm text-gray-500">{users.length} total users</span>
            </div>
            {users.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No users found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Email</th>
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="p-3 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                                <span className="text-sm font-medium text-gray-600">{user.name[0].toUpperCase()}</span>
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1 sm:hidden">{user.email}</div>
                                    </td>
                                    <td className="p-3 whitespace-nowrap hidden sm:table-cell">
                                        <div className="text-sm text-gray-900">{user.email}</div>
                                    </td>
                                    <td className="p-3 whitespace-nowrap">
                                        <span className="text-xs font-semibold uppercase">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-3 whitespace-nowrap text-center">
                                        <button 
                                            onClick={() => handleDelete(user._id)} 
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

export default AdminUsersList;