import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route element={<MainLayout />}>

                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />

                </Route>

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Dashboard />} />
                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;