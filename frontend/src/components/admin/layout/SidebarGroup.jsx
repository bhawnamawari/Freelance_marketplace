import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const SidebarGroup = ({
    icon: Icon,
    title,
    children,
}) => {
    const [open, setOpen] = useState(false);

    return (
        <div>

            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center px-4 py-3 rounded-lg hover:bg-slate-800 text-gray-300"
            >
                <div className="flex items-center gap-4">
                    <Icon />
                    {title}
                </div>

                <FaChevronDown
                    className={`transition ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {open && (
                <div className="ml-10 mt-2 space-y-2">
                    {children}
                </div>
            )}

        </div>
    );
};

export default SidebarGroup;