import React, {createContext, useContext, useState} from "react";

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
                <div className={`fixed top-0 left-0 w-full p-4 ${messageType === 'success' ? 'bg-green-500' : messageType === 'error' ? 'bg-red-500' : 'bg-blue-500'} text-white text-center`}>
                    <div className="flex justify-between items-center">
                        <span>{message}</span>
                        <button onClick={hideMessage} className="text-white font-semibold">&times;</button>
                    </div>
                </div>
            )}
        </BannerContext.Provider>
    )
}

export const useBanner = () => useContext(BannerContext);