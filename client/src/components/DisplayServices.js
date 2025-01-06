import React, { useEffect } from "react";
import { useServices } from "../context/ServiceContext";

const DisplayServices = () => {
    const { services } = useServices();

    useEffect(() => {
        console.log(services);
    }, [services]);

    const listServices = services.services || [];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Your Services</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {listServices.length === 0 ? (
                    <p className="text-gray-500">No services found.</p>
                ) : listServices && listServices.map((service) => (
                    <div
                        key={service._id}
                        className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{service.title}</h2>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                            Edit Service
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayServices;
