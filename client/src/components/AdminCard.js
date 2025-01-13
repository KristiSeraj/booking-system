import React from "react";

const AdminCard = ({ title, count }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">{count}</p>
        </div>
    )
}

export default AdminCard;