import React, { createContext, useContext, useState } from "react";

const BannerContext = createContext();

export const BannerProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const showMessage = (message, type = 'info') => {
        setMessage(message);
        setMessageType(type);
        setIsVisible(true);

        setTimeout(() => {
            setIsVisible(false);
        }, 5000)
    }

    const hideMessage = () => setIsVisible(false);

    return (
        <BannerContext.Provider value={{ showMessage, hideMessage }}>
            {children}

            {isVisible && (
                <div
                    className={`fixed bottom-4 right-4 w-80 p-4 rounded-lg shadow-lg ${messageType === 'success' ? 'bg-green-600' : messageType === 'error' ? 'bg-red-600' : 'bg-blue-600'} text-white text-sm flex items-center justify-between space-x-3 transition-all duration-300 ease-in-out z-50`}
                    style={{ animation: 'fadeIn 0.5s ease-out' }}
                >
                    <div className="flex items-center space-x-3">
                        {messageType === 'success' && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                        {messageType === 'error' && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                        {messageType === 'info' && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M6 10l6-6 6 6" />
                            </svg>
                        )}
                        <span className="font-semibold text-sm">{message}</span>
                    </div>
                    <button onClick={hideMessage} className="text-white text-lg font-bold hover:bg-opacity-80 rounded-full p-1">
                        &times;
                    </button>
                </div>
            )}
        </BannerContext.Provider>
    )
}

export const useBanner = () => useContext(BannerContext);