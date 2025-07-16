import React, { useEffect, useState } from "react";

const Modetails = ({ show, onClose, contactData }) => {
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    if (show) {
      setTimeout(() => setAnimateIn(true), 10);
    } else {
      setAnimateIn(false);
    }
  }, [show]);

  if (!show) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-55 overflow-y-auto  flex items-center  justify-center transition-colors duration-300 ${
        animateIn ? ' bg-opacity-20 backdrop-invert-30' : ''
      }`}
      onClick={onClose}
    >
      <div 
        className={`relative bg-white ml-2 rounded-lg shadow-xl  max-w-3xl w-full mx-4 transition-all duration-300 ${
          animateIn ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-bold text-gray-800">
            Contact Details: {contactData?.name || 'N/A'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {contactData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Mobile</p>
                <p className="font-medium">{contactData.mobile || 'N/A'}</p>
              </div>
                
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{contactData.status || 'N/A'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Sub Status</p>
                <p className="font-medium">{contactData.subStatus || 'N/A'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Lead Created</p>
                <p className="font-medium">{contactData.leadCreated || 'N/A'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Source</p>
                <p className="font-medium">{contactData.source || 'N/A'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Group</p>
                <p className="font-medium">{contactData.group || 'N/A'}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500">No contact details available</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={onClose}
            className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modetails;