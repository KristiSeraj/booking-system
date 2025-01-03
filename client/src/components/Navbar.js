import React from 'react';
import useAuth from "../context/useAuth";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav>
            <h1>Booking System</h1>
            {user ? (
                <>
                    <span>Welcome, {user.name}!</span>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <a href="/login">Login</a>
            )}
        </nav>
    );
};

export default Navbar;
