import React, {useState} from 'react';
import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";
import {loginUser} from "../utils/authApi";

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(email, password);
            console.log(response)
            login(response.data.user);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    )
};


export default Login;