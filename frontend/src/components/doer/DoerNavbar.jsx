import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DoerNavbar = () => {
  const { logout } = useAuth();

  const activeClass =
    "text-buttonColor font-semibold border-b-2 border-buttonColor";
  const inactiveClass = "hover:text-buttonColor text-white";

  return (
    <nav className="h-14 bg-primary text-white flex items-center justify-between px-6 shadow-md">
      
      {/* LOGO */}
      <NavLink
        to="/member/dashboard"
        className="font-bold text-buttonColor text-xl"
      >
        TASKLY
      </NavLink>

      {/* LINKS */}
      <div className="flex items-center gap-6 text-sm font-medium">
        <NavLink
          to="/member/dashboard"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/member/profile"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Profile
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

export default DoerNavbar;
