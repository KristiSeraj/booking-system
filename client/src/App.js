import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { ServiceProvider } from "./context/ServiceContext";
import { BannerProvider } from "./context/BannerContext";

function App() {
    return (
        <BannerProvider>
            <AuthProvider>
                <ServiceProvider>
                    <AppRoutes />
                </ServiceProvider>
            </AuthProvider>
        </BannerProvider>
    );
}

export default App;
