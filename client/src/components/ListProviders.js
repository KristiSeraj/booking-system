import React, { useEffect } from "react";
import { useServices } from "../context/ServiceContext";

const ListProviders = () => {
    const { services } = useServices();

    useEffect(() => {
        console.log(services);
    }, [services]);

    const providers = services;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Services</h1>
            {providers && providers.map((provider) => (
                <div
                    key={provider._id}
                    className="bg-white shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow"
                >
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{provider.name}</h2>

                    {provider.services.length === 0 ? (
                        <p className="text-gray-500">No services found.</p>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {provider.services.map((service) => (
                                <div
                                    key={service._id}
                                    className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                                >
                                    <h3 className="text-xl font-medium text-gray-700">{service.title}</h3>
                                    <p className="text-gray-600">{service.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ListProviders;
