import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./AppRoutes";
import {ServiceProvider} from "./context/ServiceContext";

function App() {
    return (
        <AuthProvider>
            <ServiceProvider>
                <AppRoutes />
            </ServiceProvider>
        </AuthProvider>
    );
}

export default App;
