import AdminSidebar from "./AdminSidebar";

const MobileSidebar = ({
    open,
    onClose,
}) => {

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">

            <div className="w-72 h-full bg-slate-900">

                <button
                    onClick={onClose}
                    className="text-white p-4"
                >
                    ✕
                </button>

                <AdminSidebar />

            </div>

        </div>
    );
};

export default MobileSidebar;