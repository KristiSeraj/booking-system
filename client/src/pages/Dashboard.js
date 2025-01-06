import React, { useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import DisplayServices from "../components/DisplayServices";
import ListProviders from "../components/ListProviders";

const Dashboard = () => {
    const { loading, user } = useAuth();
    useEffect(() => {
        if (!loading && user) {
            console.log(`Welcome ${user.name}`);
        }
    }, [user, loading])
    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <>
            <h1>Welcome {user.name}</h1>
            {user.role === 'provider' ? <DisplayServices /> : <ListProviders />}
        </>
    )
}

export default Dashboard;