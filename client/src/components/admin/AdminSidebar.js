import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex">
            <button 
                className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded bg-gray-800 text-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
            </button>
            
            <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static top-0 left-0 z-10 w-64 bg-gray-800 text-white min-h-screen transition-transform duration-300 ease-in-out`}>
                <div className="p-6 flex items-center justify-between">
                    <h1 className={`text-2xl font-bold ${isOpen ? 'ml-16' : 'ml-0'} transition-all duration-300 ease-in-out`}>Admin Panel</h1>
                </div>
                <nav className="mt-10">
                    <NavLink 
                        to="/admin" 
                        className="block py-2.5 px-4 hover:bg-gray-700"
                        onClick={() => setIsOpen(false)}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink 
                        to="/admin/users" 
                        className="block py-2.5 px-4 hover:bg-gray-700"
                        onClick={() => setIsOpen(false)}
                    >
                        Users
                    </NavLink>
                    <NavLink 
                        to="/admin/services" 
                        className="block py-2.5 px-4 hover:bg-gray-700"
                        onClick={() => setIsOpen(false)}
                    >
                        Services
                    </NavLink>
                    <NavLink 
                        to="/admin/appointments" 
                        className="block py-2.5 px-4 hover:bg-gray-700"
                        onClick={() => setIsOpen(false)}
                    >
                        Appointments
                    </NavLink>
                </nav>
            </aside>
        </div>
    );
};

export default AdminSidebar;
