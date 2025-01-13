import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Homepage = () => {
    const { user } = useAuth();
    return (
        <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1532102235608-dc8fc689c9ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Scenic background" className="object-cover object-center w-full h-full"/>
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
                <h1 className="text-5xl font-bold leading-tight mb-4">Welcome to Our Awesome Booking System</h1>
                <p className="text-lg text-gray-300 mb-8">Discover amazing features and services that await you.</p>
                <Link to={user?.role === 'admin' ? '/admin' : user ? '/dashboard' : '/login'}
                      className="bg-black text-white hover:bg-gray-900 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">Get
                    Started</Link>
            </div>
        </div>
      )
};

export default Homepage;
