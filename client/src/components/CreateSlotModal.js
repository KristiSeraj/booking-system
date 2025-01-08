import React, {useState} from 'react';

const CreateSlotModal = () => {
    const [dateTime, setDateTime] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSave = () => {
        handleClose();
    }

    const handleClose = () => setIsOpen(false);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    }

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300">
                Create slot
            </button>
            {isOpen && (
                <div onClick={handleOverlayClick} className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">

                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold text-gray-800">Create a Slot</h2>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="datetime" className="block text-sm font-medium text-gray-700">
                                Select Date and Time
                            </label>
                            <input
                                id="datetime"
                                type="datetime-local"
                                value={dateTime}
                                onChange={(e) => setDateTime(e.target.value)}
                                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="mt-4 flex justify-end gap-4">
                            <button onClick={handleClose} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleSave}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateSlotModal;
