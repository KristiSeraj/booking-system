import React from 'react';
import { useAuth } from "../context/AuthContext";
import DisplayServices from "../components/DisplayServices";
import ListProviders from "../components/ListProviders";

const Dashboard = () => {
    const { loading, user } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg text-gray-600">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                        Welcome, <span className="text-blue-600 inline-block">{user.name}</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        {user?.role === "provider" 
                            ? "Manage your services and connect with customers"
                            : "Find and connect with service providers"}
                    </p>
                </div>

                {user?.role === "provider" ? (
                    <DisplayServices />
                ) : user?.role === "customer" ? (
                    <ListProviders />
                ) : (
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto border border-red-100">
                        <div className="flex items-center justify-center text-red-500 mb-4">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <p className="text-red-600 text-lg text-center font-medium">Invalid role detected.</p>
                        <p className="mt-2 text-gray-600 text-center">Please contact support for assistance.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;