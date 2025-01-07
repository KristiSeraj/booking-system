import React, {useState} from "react";

const EditServiceModal = ({ service, onSave }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(service?.title || '');
    const [description, setDescription] = useState(service?.description || '');

    const handleSave = () => {
        onSave({ ...service, title, description})
        setIsOpen(false);
    }

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300">
                Edit Service
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Service</h2>

                        <label className="block mb-2 text-sm font-medium text-gray-600">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />

                        <label className="block mb-2 text-sm font-medium text-gray-600">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />

                        <div className="flex justify-end gap-4">
                            <button onClick={() => setIsOpen(false)}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleSave}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditServiceModal;