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
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
                    <p className="text-gray-600 font-medium">Loading service details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-lg mx-4">
                    <div className="flex items-center space-x-3">
                        <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-8">
                <GoBackButton />
                {service ? (
                    <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 md:p-8">
                        <div className="max-w-3xl mx-auto">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">{service.title}</h1>
                            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">{service.description}</p>
                            {user?.role === 'provider' && (
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500 border-t border-gray-100 pt-4">
                                    <p><span className="font-medium">Created:</span> {new Date(service.createdAt).toLocaleDateString()}</p>
                                    <p><span className="font-medium">Updated:</span> {new Date(service.updatedAt).toLocaleDateString()}</p>
                                </div>
                            )}

                            <div className="mt-8 sm:mt-12">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Available Slots</h2>
                                    {user?.role === 'provider' && (
                                        <>
                                            <button 
                                                onClick={handleCreate} 
                                                className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                                </svg>
                                                Create Slot
                                            </button>
                                            <SlotModal onSave={handleCreateOrUpdate} initialData={editingSlot} isOpen={openModal} onClose={() => setOpenModal(false)} />
                                        </>
                                    )}
                                </div>
                                {availableSlots && availableSlots.length > 0 ? (
                                    <div className="grid gap-3 sm:gap-4">
                                        {availableSlots.map((slot) => (
                                            <div 
                                                key={slot._id}
                                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 sm:p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors shadow-sm hover:shadow-md gap-4 sm:gap-0"
                                            >
                                                <div className="flex items-center gap-3 sm:gap-4">
                                                    <div className="bg-blue-50 rounded-lg p-2 sm:p-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-base sm:text-lg font-medium text-gray-900">
                                                        {new Date(slot.dateTime).toLocaleString('en-GB', { 
                                                            month: 'long', 
                                                            day: 'numeric', 
                                                            year: 'numeric', 
                                                            hour: '2-digit', 
                                                            minute: '2-digit', 
                                                            hour12: true,
                                                            timeZone: 'UTC'
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                                                    <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                                                        slot.isBooked 
                                                            ? "bg-red-100 text-red-800" 
                                                            : 'bg-green-100 text-green-800'
                                                    }`}>
                                                        {slot.isBooked ? "Booked" : "Available"}
                                                    </span>
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
                                                            className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" 
                                                            onClick={() => handleBookAppoinment(service._id, slot._id)}
                                                        >
                                                            Book Now
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600">No available slots</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8 sm:py-12 bg-white rounded-xl shadow-lg">
                        <p className="text-lg sm:text-xl text-gray-600">Service not found.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ServiceDetails;