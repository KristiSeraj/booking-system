import React, { useState } from "react";

const ThreeDotMenu = ({ onEdit, onDelete }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = (e) => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="relative">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                &#8226;&#8226;&#8226;
            </button>

            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg transition-all transform origin-top-right z-10">
                    <button onClick={onEdit} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 focus:outline-none w-full text-left rounded-t-lg">
                        Edit
                    </button>
                    <button onClick={onDelete} className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-100 focus:outline-none w-full text-left rounded-b-lg">
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}

export default ThreeDotMenu;