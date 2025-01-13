import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white min-h-screen">
            <div className="p-6">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>
            <nav className="mt-10">
                <NavLink to="/admin" className="block py-2.5 px-4 hover:bg-gray-700">
                    Dashboard
                </NavLink>
                <NavLink to="/admin/users" className="block py-2.5 px-4 hover:bg-gray-700">
                    Users
                </NavLink>
                <NavLink to="/admin/services" className="block py-2.5 px-4 hover:bg-gray-700">
                    Services
                </NavLink>
                <NavLink to="/admin/appointments" className="block py-2.5 px-4 hover:bg-gray-700">
                    Appointments
                </NavLink>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
