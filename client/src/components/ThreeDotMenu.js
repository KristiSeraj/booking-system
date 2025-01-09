import React, { useState } from "react";

const ThreeDotMenu = ({ onEdit, onDelete }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="relative">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800">
                &#8226;&#8226;&#8226;
            </button>

            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <button onClick={onEdit} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                        Edit
                    </button>
                    <button onClick={onDelete} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}

export default ThreeDotMenu;