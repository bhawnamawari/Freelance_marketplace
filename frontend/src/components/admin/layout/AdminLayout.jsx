import { Outlet } from "react-router-dom";
import { useState } from "react";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import MobileSidebar from "./MobileSidebar";
import AdminFooter from "./AdminFooter";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100">

            {/* Desktop Sidebar */}
            <AdminSidebar />

            {/* Mobile Sidebar */}
            <MobileSidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="lg:ml-72 flex flex-col min-h-screen">

                <AdminNavbar
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <main className="flex-1 p-6">
                    <Outlet />
                </main>

                <AdminFooter />

            </div>

        </div>
    );
};

export default AdminLayout;