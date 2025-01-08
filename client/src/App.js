import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./AppRoutes";
import {ServiceProvider} from "./context/ServiceContext";
import {BannerProvider} from "./context/BannerContext";

function App() {
    return (
        <AuthProvider>
            <ServiceProvider>
                <BannerProvider>
                    <AppRoutes />
                </BannerProvider>
            </ServiceProvider>
        </AuthProvider>
    );
}

export default App;
