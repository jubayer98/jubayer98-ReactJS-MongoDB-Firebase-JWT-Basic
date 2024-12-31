import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-600 text-white">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-2xl text-slate-300 mb-6">Oops! The page you're looking for doesn't exist.</p>
            <Link
                to="/"
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
            >
                Go Back to Home
            </Link>
        </div>
    );
};

export default ErrorPage;
