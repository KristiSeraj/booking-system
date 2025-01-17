import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { user, updateAuthUser } = useAuth();
    const [newName, setNewName] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);

    const handleSaveName = async () => {
        await updateAuthUser(newName);
        setIsEditingName(false);
    }

    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="px-8 py-10 sm:px-12">
                        <div className="flex items-center space-x-6 pb-8 border-b border-gray-200">
                            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-3xl font-semibold text-blue-600">
                                    {user.name[0].toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
                                <p className="text-lg text-gray-600 mt-1">{user.role}</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>
                            <div className="space-y-8">
                                <div className="flex items-center justify-between py-4 px-6 bg-gray-50 rounded-xl">
                                    <p className="font-medium text-gray-700">Email</p>
                                    <p className="text-gray-900">{user.email}</p>
                                </div>

                                <div className="flex items-center justify-between py-4 px-6 bg-gray-50 rounded-xl">
                                    <p className="font-medium text-gray-700">Name</p>
                                    <div className="flex items-center">
                                        {isEditingName ? (
                                            <div className="flex items-center space-x-3">
                                                <input
                                                    type="text"
                                                    value={newName}
                                                    onChange={(e) => setNewName(e.target.value)}
                                                    placeholder={user.name}
                                                    className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <button 
                                                    onClick={handleSaveName}
                                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                >
                                                    Save
                                                </button>
                                                <button 
                                                    onClick={() => setIsEditingName(false)}
                                                    className="bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center space-x-3">
                                                <p className="text-gray-900">{user.name}</p>
                                                <button 
                                                    onClick={() => {
                                                        setNewName(user.name);
                                                        setIsEditingName(true);
                                                    }}
                                                    className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:underline"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-4 px-6 bg-gray-50 rounded-xl">
                                    <p className="font-medium text-gray-700">Role</p>
                                    <p className="text-gray-900">{user.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;