import React from "react";
import { useServices } from "../context/ServiceContext";
import { Link } from "react-router-dom";
import EditServiceModal from "./EditServiceModal";
import CreateServiceModal from "./CreateServiceModal";

const DisplayServices = () => {
    const { services, deleteService, updateService, createNewService } = useServices();
    const listServices = services.services || [];

    const handleSave = async (updatedService) => {
        await updateService(updatedService._id, updatedService.title, updatedService.description);
    }

    const handleCreate = async (newService) => {
        await createNewService(newService.title, newService.description);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Your Services
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Manage and organize your professional services
                    </p>
                    <div className="mt-8">
                        <CreateServiceModal onSave={handleCreate} />
                    </div>
                </div>

                {listServices.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-10 sm:p-12 max-w-lg mx-auto border border-gray-200">
                            <div className="mb-6">
                                <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <p className="text-gray-700 text-xl font-medium">
                                No services available yet
                            </p>
                            <p className="text-gray-500 mt-2">
                                Create your first service to get started
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {listServices.map((service) => (
                            <div 
                                key={service._id}
                                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-t-4 hover:border-t-blue-500 hover:scale-102"
                            >
                                <div className="p-6 sm:p-8 flex flex-col h-full">
                                    <div className="flex-grow">
                                        <Link 
                                            to={`/services/${service._id}`}
                                            className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300 block mb-3"
                                        >
                                            {service.title}
                                        </Link>
                                        <p className="text-gray-600 text-base sm:text-lg mb-6 line-clamp-3 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                    <div className="flex gap-4 pt-4 border-t border-gray-100 mt-auto">
                                        <EditServiceModal 
                                            service={service} 
                                            onSave={handleSave}
                                        />
                                        <button 
                                            onClick={() => deleteService(service._id)}
                                            className="flex-1 bg-white border border-rose-500 text-rose-500 py-2 px-4 rounded-lg hover:bg-rose-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-200 active:bg-rose-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DisplayServices;