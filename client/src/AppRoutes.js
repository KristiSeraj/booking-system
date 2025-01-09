import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext";
import Appointments from "./pages/Appointments";
import Layout from "./components/Layout";
import ServiceDetails from "./components/ServiceDetails";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function AppRoutes() {
    const { user, loading } = useAuth();
    const ProtectedRoute = ({ children, role }) => {
        if (loading) return <p>Loading...</p>
        if (!user) {
            return <Navigate to='/login' />
        }
        if (role && user.role !== role) {
            return <Navigate to='/' />
        }
        return children;
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<Layout />}>
                    <Route path="profile" element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                    />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                    />
                    <Route path="/appointments" element={
                        <ProtectedRoute>
                            <Appointments />
                        </ProtectedRoute>
                    }
                    />
                    <Route path="/service/:id" element={
                        <ProtectedRoute>
                            <ServiceDetails />
                        </ProtectedRoute>
                    }
                    />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
