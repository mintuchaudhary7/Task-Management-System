import { Link } from "react-router-dom";

export default function Unauthorized() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-3xl font-bold text-red-600">Unauthorized</h1>
            <p className="mt-2 text-gray-600">
                You do not have permission to access this page.
            </p>

            <Link
                to="/"
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
                Go Home
            </Link>
        </div>
    );
}
