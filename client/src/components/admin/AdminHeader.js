import React from "react";
import { useAuth } from "../../context/AuthContext";

const AdminHeader = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow-md p-4 sm:p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xl text-gray-600">{user?.name?.[0]?.toUpperCase()}</span>
                </div>
                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Welcome, {user?.name}</h2>
                    <p className="text-sm text-gray-500">Administrator</p>
                </div>
            </div>
            <button 
                onClick={logout} 
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center space-x-2"
            >
                <span>Logout</span>
            </button>
        </header>
    );
};

export default AdminHeader;
