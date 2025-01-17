import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Homepage = () => {
    const { user } = useAuth();
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1532102235608-dc8fc689c9ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Scenic background" 
                    className="object-cover object-center w-full h-full filter brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/70"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 flex flex-col justify-center items-center min-h-screen text-center">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6 text-white">
                    Welcome to Our Awesome Booking System
                </h1>
                <p className="text-lg sm:text-xl text-gray-200 mb-12 max-w-2xl">
                    Discover amazing features and services that await you. Book appointments with ease and manage your schedule efficiently.
                </p>
                <div className="space-x-4">
                    {!user && (
                    <Link 
                        to='/register'
                        className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                        Get Started
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                    )}
                        <Link 
                            to={user?.role === 'admin' ? '/admin' : user ? '/dashboard' : '/login'}
                            className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-black/30 hover:bg-black/40 rounded-full backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
                        >
                            Sign In
                        </Link>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
