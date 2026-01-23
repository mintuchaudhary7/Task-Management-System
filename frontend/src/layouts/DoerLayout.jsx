import { Outlet } from "react-router-dom";
import DoerNavbar from "../components/doer/DoerNavbar";

const DoerLayout = () => {
    return (
        <>
            <DoerNavbar />
            <main className="pt-4 p-6">
                <Outlet />
            </main>
        </>
    );
};

export default DoerLayout;
