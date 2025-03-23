import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="min-h-screen bg-[#1f2937] flex items-center justify-center px-4">
            <div className="max-w-lg w-full text-center">
                <h1 className="text-4xl font-bold text-gray-100 mb-4">Oops!</h1>
                <p className="text-xl text-gray-300 mb-8">
                    {error.statusText || error.message || "Sorry, an unexpected error has occurred."}
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage; 