import React from "react";
import { useAuth } from "../../context/AuthContext";

const AdminHeader = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Welcome, {user?.name}</h2>
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                Logout
            </button>
        </header>
    );
};

export default AdminHeader;
