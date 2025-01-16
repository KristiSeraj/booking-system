import React from "react";
import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <button
            onClick={handleGoBack}
            className="flex items-center gap-2 mb-5 px-4 py-2.5 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 active:bg-blue-700 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                />
            </svg>
            <span className="font-medium">Go Back</span>
        </button>
    )
}

export default GoBackButton;