import { Link, NavLink } from "react-router-dom";
import { FaUserCircle, FaBell } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-2xl font-bold text-blue-600"
                >
                    FreelanceHub
                </Link>

                <div className="flex gap-8">

                    <NavLink to="/">
                        Home
                    </NavLink>

                    <NavLink to="/projects">
                        Projects
                    </NavLink>

                    <NavLink to="/freelancers">
                        Freelancers
                    </NavLink>

                    <NavLink to="/about">
                        About
                    </NavLink>

                </div>

                <div className="flex gap-5 items-center">

                    <FaBell
                        className="text-xl cursor-pointer"
                    />

                    <FaUserCircle
                        className="text-3xl cursor-pointer"
                    />

                </div>

            </div>
        </nav>
    );
};

export default Navbar;