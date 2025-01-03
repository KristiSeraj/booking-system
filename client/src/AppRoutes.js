import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import useAuth from "./context/useAuth";

function AppRoutes() {
    const { user } = useAuth();
    const ProtectedRoute = ({ children, role }) => {
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
                <Route path="/booking" element={
                    <ProtectedRoute>
                        <Booking />
                    </ProtectedRoute>
                }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
