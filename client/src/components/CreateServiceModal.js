import React, { useState } from "react";

const CreateServiceModal = ({ onSave }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSave = () => {
        onSave({ title, description });
        handleClose();
    }

    const handleClose = () => {
        setIsOpen(false);
        setTitle('');
        setDescription('');
    }

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="mb-5 bg-blue-600 text-white py-3 px-6 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 font-medium flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Create Service
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white/90 rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Create Service</h2>
                            <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Service Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter service title"
                                    className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Service Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter service decription"
                                    className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center gap-4 mt-8">
                                <button 
                                    onClick={handleClose}
                                    className="px-6 py-2.5 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleSave}
                                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                                >
                                    Save Service
                                </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateServiceModal;