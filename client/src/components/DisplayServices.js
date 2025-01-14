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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Your Services</h1>
            <CreateServiceModal onSave={handleCreate} />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {listServices.length === 0 ? (
                    <p className="text-gray-500">No services found.</p>
                ) : listServices && listServices.map((service) => (
                    <div key={service._id}
                         className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <Link to={`/services/${service._id}`}
                              className="text-2xl font-semibold text-gray-800 mb-2 block">{service.title}</Link>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <div className="flex gap-4">
                            <EditServiceModal service={service} onSave={handleSave}/>
                            <button onClick={() => deleteService(service._id)}
                                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300">
                                Delete Service
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayServices;
