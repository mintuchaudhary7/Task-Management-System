import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <main className=" p-3">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
