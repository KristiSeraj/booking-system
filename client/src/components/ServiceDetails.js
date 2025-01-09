import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getServiceById } from "../utils/serviceApi";
import CreateSlotModal from "./CreateSlotModal";
import { useServices } from "../context/ServiceContext";

const ServiceDetails = () => {
    const { id } = useParams();
    const { token } = useAuth();
    const { createNewSlot } = useServices();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleCreate = async (dateTime) => {
        await createNewSlot(id, dateTime);
    }
    
    useEffect(() => {
        const fetchServiceById = async () => {
            try {
                setLoading(true);
                const response = await getServiceById(id, token);
                setService(response.data);
            } catch (error) {
                console.log('Error fetching service', error);
                setError(error.response.data.message);
            } finally {
                setLoading(false);
            }
        };
        fetchServiceById();
    }, [id, token])

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }
    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {service ? (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">{service.title}</h1>
                    <p className="text-gray-600">{service.description}</p>
                    <div className="mt-6 text-gray-500">
                        <p><strong>Created At:</strong> {new Date(service.createdAt).toLocaleDateString()}</p>
                        <p><strong>Updated At:</strong> {new Date(service.updatedAt).toLocaleDateString()}</p>
                    </div>

                    <div className="mt-8">
                        <div className="mt-8 flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Slots</h2>
                            <CreateSlotModal onSave={handleCreate}/>
                        </div>
                        {service.availableSlots && service.availableSlots.length > 0 ? (
                            <ul className="space-y-4">
                                {service.availableSlots.map((slot) => (
                                    <li key={slot._id}
                                        className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <span className="text-gray-700 uppercase">{new Date(slot.dateTime).toLocaleString('en-GB', { month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                                        <span className={`px-3 py-1 rounded-full text-sm ${slot.isBooked ? "bg-red-500 text-white" : 'bg-green-500 text-white'}`}>{slot.isBooked ? "Booked" : "Available"}</span>
                                        <span>&#8226;&#8226;&#8226;</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No available Slots</p>
                        )}
                        </div>
                    </div>
                    ) : (
                    <p className="text-gray-600">Service not found.</p>
            )}
        </div>
    )
}

export default ServiceDetails;