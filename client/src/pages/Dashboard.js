import React from 'react';
import { useAuth } from "../context/AuthContext";
import DisplayServices from "../components/DisplayServices";
import ListProviders from "../components/ListProviders";

const Dashboard = () => {
    const { loading, user } = useAuth();

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Welcome <span className="text-blue-600">{user.name}</span></h1>
            {user?.role === "provider" ? (
                <DisplayServices />
            ) : user?.role === "customer" ? (
                <ListProviders />
            ) : (
                <p className="text-red-500 text-center">Invalid role detected.</p>
            )}
        </div>
    )
}

export default Dashboard;