import React from "react";
import { useAdmin } from "../../context/AdminContext";

const AdminUsersList = () => {
    const { users, adminDeleteUser } = useAdmin();
    const handleDelete = async (id) => {
        await adminDeleteUser(id);
    }
    return (
        <div className="p-6 mt-12 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Manage Users</h2>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-2 text-left">Name</th>
                            <th className="p-2 text-left">Email</th>
                            <th className="p-2 text-left">Role</th>
                            <th className="p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b">
                                <td className="p-2">{user.name}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{user.role}</td>
                                <td className="p-2 text-center">
                                    <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600">
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

export default AdminUsersList;