import React from "react";
import { useServices } from "../context/ServiceContext";
import { Link } from "react-router-dom";

const ListProviders = () => {
    const { services } = useServices();
    const providers = services || [];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our Professional Services
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover our range of expert services provided by qualified professionals.
                    </p>
                </div>
                {providers.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 max-w-md mx-auto border border-gray-100">
                            <p className="text-gray-600 text-lg sm:text-xl">
                                No providers available at the moment.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-10 sm:space-y-14">
                        {providers.map((provider) => (
                            <div
                                key={provider._id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl border border-gray-100"
                            >
                                <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 p-6 sm:p-8">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                                        <div>
                                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                                {provider.name}
                                            </h2>
                                            <p className="text-gray-600 mt-2 text-base sm:text-lg">
                                                Professional Service Provider
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 sm:p-8">
                                    {provider.services.length === 0 ? (
                                        <div className="text-center py-8 sm:py-10">
                                            <p className="text-gray-500 text-base sm:text-lg">
                                                No services found.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                            {provider.services.map((service) => (
                                                <div 
                                                    key={service._id} 
                                                    className="group bg-white rounded-xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 relative"
                                                >
                                                    <div className="flex justify-between items-start mb-4 sm:mb-6">
                                                        <Link
                                                            to={`/services/${service._id}`}
                                                            className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                                            {service.title}
                                                        </Link>
                                                    </div>
                                                    <p className="text-gray-600 text-base sm:text-lg line-clamp-3">
                                                        {service.description}
                                                    </p>
                                                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <Link
                                                            to={`/services/${service._id}`}
                                                            className="inline-flex items-center text-blue-600 hover:text-blue-700">
                                                            Learn more
                                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListProviders;
