import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./AppRoutes";
import {ServiceProvider} from "./context/ServiceContext";
import {BannerProvider} from "./context/BannerContext";

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
