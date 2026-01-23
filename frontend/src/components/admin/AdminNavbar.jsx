import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminNavbar = () => {
    const { logout } = useAuth();

    const activeClass =
        "text-buttonColor font-semibold border-b-2 border-buttonColor";

    const inactiveClass = "hover:text-buttonColor text-white";

    return (
        <nav className="h-14 bg-primary text-white flex items-center justify-between px-6 shadow-md">
            <NavLink to="/admin/dashboard" className="font-bold text-buttonColor text-xl">
                TASKLY (Admin)
            </NavLink>

            <div className="flex items-center gap-6 text-sm font-medium">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/admin/users"
                    className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                >
                    Users
                </NavLink>
                <NavLink
                    to="/admin/templates"
                    className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                >
                    Templates
                </NavLink>
                <NavLink
                    to="/admin/instances"
                    className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                >
                    Instances
                </NavLink>
                <NavLink
                    to="/admin/tasks"
                    className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                >
                    Tasks
                </NavLink>

                <button
                    onClick={logout}
                    className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition text-xs"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default AdminNavbar;
