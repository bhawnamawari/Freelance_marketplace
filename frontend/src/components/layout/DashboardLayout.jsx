import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <div className="p-6">

                    <Outlet />

                </div>

            </div>

        </div>
    );
};

export default DashboardLayout;