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
                    <div className="text-center py-12">
                        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 max-w-md mx-auto border border-gray-100">
                            <p className="text-gray-600 text-lg sm:text-xl">
                                No services available. Create your first service to get started.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {listServices.map((service) => (
                            <div 
                                key={service._id}
                                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-t-4 hover:border-t-blue-500 transform hover:-translate-y-1 hover:scale-102"
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