import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-6 py-24">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center">
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <p className="text-3xl font-bold text-indigo-600">404</p>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                    Page not found
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-12">
                    Sorry, we couldn't find the page you're looking for. The page might have been removed, renamed, or doesn't exist.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                        to='/' 
                        className="w-full sm:w-auto px-8 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Return Home
                    </Link>
                    <Link 
                        to='/dashboard' 
                        className="w-full sm:w-auto px-8 py-3 text-base font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default NotFound;