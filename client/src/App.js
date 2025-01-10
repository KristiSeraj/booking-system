import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { ServiceProvider } from "./context/ServiceContext";
import { BannerProvider } from "./context/BannerContext";
import { AppointmentProvider } from "./context/AppointmentContext";

function App() {
    return (
        <BannerProvider>
            <AuthProvider>
                <ServiceProvider>
                    <AppointmentProvider>
                        <AppRoutes />
                    </AppointmentProvider>
                </ServiceProvider>
            </AuthProvider>
        </BannerProvider>
    );
}

export default App;
