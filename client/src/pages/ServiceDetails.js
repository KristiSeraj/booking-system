import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getServiceById } from "../utils/serviceApi";
import SlotModal from "../components/SlotModal";
import { useServices } from "../context/ServiceContext";
import ThreeDotMenu from "../components/ThreeDotMenu";
import { useAppointment } from "../context/AppointmentContext";
import GoBackButton from "../components/GoBackButton";

const ServiceDetails = () => {
    const { id } = useParams();
    const { token, user } = useAuth();
    const { createNewSlot, deleteSlotById, updateSlot } = useServices();
    const { bookNewAppointment } = useAppointment();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openSlotMenu, setOpenSlotMenu] = useState(null);
    const [editingSlot, setEditingSlot] = useState(null);
    const [openModal, setOpenModal] = useState(false); 

    const handleCreateOrUpdate = async (dateTime, slotId) => {
        if (slotId) {
            await updateSlot(service._id, slotId, dateTime);
        } else {
            await createNewSlot(id, dateTime);
        }
        setEditingSlot(null)
        setOpenModal(false);
    }

    const handleEdit = (slot) => {
        setEditingSlot(slot)
        setOpenModal(true)
    }

    const handleCreate = () => {
        setEditingSlot(null);
        setOpenModal(true)
    }

    const handleDelete = async (slotId) => {
        await deleteSlotById(service._id, slotId);
    }

    const handleBookAppoinment = async (serviceId, slotId) => {
        await bookNewAppointment(serviceId, slotId);
    }

    const handleSlotMenu = (slotId) => {
        setOpenSlotMenu(openSlotMenu === slotId ? null : slotId);
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

    const availableSlots = user?.role === 'customer' ? service?.availableSlots.filter((slot) => !slot.isBooked) : service?.availableSlots;

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <GoBackButton />
            {service ? (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">{service.title}</h1>
                    <p className="text-gray-600">{service.description}</p>
                    {user?.role === 'provider' && (
                        <div className="mt-6 text-gray-500">
                            <p><strong>Created At:</strong> {new Date(service.createdAt).toLocaleDateString()}</p>
                            <p><strong>Updated At:</strong> {new Date(service.updatedAt).toLocaleDateString()}</p>
                        </div>
                    )}

                    <div className="mt-8">
                        <div className="mt-8 flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Slots</h2>
                            <button onClick={handleCreate} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300">
                                Create Slot
                            </button>
                            {user?.role === 'provider' && <SlotModal onSave={handleCreateOrUpdate} initialData={editingSlot} isOpen={openModal} onClose={() => setOpenModal(false)} />}
                        </div>
                        {availableSlots && availableSlots.length > 0 ? (
                            <ul className="space-y-4">
                                {availableSlots.map((slot) => (
                                    <li key={slot._id}
                                        className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <span className="text-gray-700 uppercase">{new Date(slot.dateTime).toLocaleString('en-GB', { month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                                        <span className={`px-3 py-1 rounded-full text-sm ${slot.isBooked ? "bg-red-500 text-white" : 'bg-green-500 text-white'}`}>{slot.isBooked ? "Booked" : "Available"}</span>
                                        {user?.role === 'provider' ? (
                                            <ThreeDotMenu 
                                                slotId={slot._id} 
                                                isOpen={openSlotMenu === slot._id} 
                                                toggleMenu={handleSlotMenu} 
                                                onEdit={() => handleEdit(slot)} 
                                                onDelete={handleDelete} 
                                            />
                                        ) : (
                                            <button 
                                                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-300" 
                                                onClick={() => handleBookAppoinment(service._id, slot._id)}
                                            >
                                                Book
                                            </button>
                                        )}
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