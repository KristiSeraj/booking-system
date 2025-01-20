import React, { useEffect, useState } from 'react';
import { useBanner } from "../context/BannerContext";

const SlotModal = ({ onSave, initialData, isOpen, onClose }) => {
    const { showMessage } = useBanner();
    const [dateTime, setDateTime] = useState(initialData ? new Date(initialData.dateTime).toISOString().slice(0, 16) : '');

    useEffect(() => {
        if (initialData) {
            setDateTime(new Date(initialData.dateTime).toISOString().slice(0, 16))
        }
    }, [initialData]);

    const handleSave = () => {
        const selectedTime = new Date(dateTime);
        const now = new Date();
        now.setSeconds(0, 0);
        if (!dateTime || selectedTime < now) {
            // alert("Please select a valid date and time");
            showMessage('Please select a valid date and time', 'info');
            return;
        }
        onSave(dateTime, initialData?._id);
        onClose();
    }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    if (!isOpen) return null;

    return (
        <>
            <div onClick={handleOverlayClick} className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {initialData ? 'Update Time Slot' : 'Create New Time Slot'}
                        </h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="datetime" className="block text-sm font-medium text-gray-700 mb-2">
                                Select Date and Time
                            </label>
                            <input
                                id="datetime"
                                type="datetime-local"
                                value={dateTime}
                                onChange={(e) => setDateTime(e.target.value)}
                                min={new Date().toISOString().slice(0, 16)}
                                className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-4 mt-8">
                        <button 
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave}
                            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                        >
                            {initialData ? 'Update Slot' : 'Create Slot'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SlotModal;