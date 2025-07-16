import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useContact } from "../context/ContactContext";

const Import = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();
  const { fetchContacts } = useContact();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // FIXED: files not value
    setFile(selectedFile); // FIXED: using function call, not assignment
  };

  // FIXED: Moved handleSubmit outside of handleFileChange
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const formData = new FormData();
      formData.append('csvFile', file);
      
      const response = await axios.post('http://localhost:5000/api/contacts/import', formData, { // FIXED: URL
        headers: {
          'Content-Type': 'multipart/form-data', // FIXED: Type casing
          'Authorization': `Bearer ${token}`
        }
      });

      setIsUploading(false);
      setSuccessMessage("FILE UPLOADED SUCCESSFULLY");
      await fetchContacts();

      setFile(null);

      setTimeout(() => {
        navigate('/contact');
      }, 3000);
    } catch (err) {
      console.log("Error Uploading File", err); // FIXED: typo
      setIsUploading(false);
      setError("Error Uploading File");
    }
  };

  // ADDED: Basic UI
  return (
    <div className="w-full bg-white p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Import Contacts</h1>
        <button 
          onClick={() => navigate('/contact')}
          className="text-gray-600 hover:text-gray-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {error && (
        <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="p-4 mb-6 bg-green-50 border border-green-200 text-green-700 rounded-md">
          {successMessage}
          <p className="mt-2 text-sm">You will be redirected to contacts list shortly...</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Upload CSV File
          </label>
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!file || isUploading}
            className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded"
          >
            {isUploading ? "Importing..." : "Import Contacts"}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/contact')}
            className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Import;