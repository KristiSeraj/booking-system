import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { user, updateAuthUser } = useAuth();
    const [newName, setNewName] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);

    const handleSaveName = async () => {
        await updateAuthUser(newName);
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                        <p className="text-gray-500">{user.role}</p>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
                    <div className="mt-4 space-y-8">
                        <div className="flex justify-between px-4">
                            <p className="font-medium text-gray-700">Email</p>
                            <p className="text-gray-600">{user.email}</p>
                        </div>

                        <div className="mt-4 flex justify-between items-center px-4">
                            <p className="font-medium text-gray-700">Name</p>
                            <div className="flex items-center">
                                {isEditingName ? (
                                    <>
                                        <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            className="w-32 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        />
                                        <button onClick={handleSaveName} className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                                            Save
                                        </button>
                                        <button onClick={() => setIsEditingName(false)} className="ml-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400">
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-gray-600">{user.name}</p>
                                        <button onClick={() => setIsEditingName(true)} className="ml-4 text-blue-500 hover:underline">
                                            Edit
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="mt-2 flex justify-between px-4">
                            <p className="font-medium text-gray-700">Role</p>
                            <p className="text-gray-600">{user.role}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;