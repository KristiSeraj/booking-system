import React from "react";

const AdminCard = ({ title, count }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
            <div className="flex flex-col">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">{title}</h3>
                <div className="flex items-center justify-between">
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">{count}</p>
                    <div className="bg-blue-100 rounded-full p-2 sm:p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCard;