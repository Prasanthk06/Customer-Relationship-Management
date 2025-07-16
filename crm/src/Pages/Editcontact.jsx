import React, { useRef, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useContact } from "../context/ContactContext";

const Editcontact = () => {
  const { id } = useParams();
  const location = useLocation();
  const { user } = useAuth();
  const errorRef = useRef(null);
  const navigate = useNavigate();
  const { getData, updateContact } = useContact();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Safely get contactId from either location state or URL params
  const getContactId = () => {
    // First try from location state (if it exists)
    if (location.state && location.state.contactId) {
      return location.state.contactId;
    }
    
    // Then try from URL search params
    const searchParams = new URLSearchParams(location.search);
    const paramId = searchParams.get('id');
    if (paramId) {
      return paramId;
    }
    
    // Finally fall back to useParams id
    return id;
  };

  const contactId = getContactId();

  const [formValues, setFormValues] = useState({
    customerName: '',
    mobileNumber: '',
    altMobileNumber: '',
    emailId: '',
    jobTitle: '',
    address1: '',
    address2: '',
    pincode: '',
    city: '',
    district: '',
    area: '',
    state: '',
    country: '',
    landmark: '',
    interestedProduct: '',
    chitAmount: '',
    source: '',
    group: '',
    leadBranch: 'Tamil Nadu',
    leadAssignedTo: 'Tamil Nadu'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch contact data when component mounts
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!contactId) {
          throw new Error('Contact ID is missing');
        }
        
        // Use async/await with getData
        const contactData = await getData(contactId);
        
        if (contactData) {
          setFormValues({
            customerName: contactData.name || '',
            mobileNumber: contactData.mobile || '',
            altMobileNumber: contactData.altnumber || '',
            emailId: contactData.emailid || '',
            jobTitle: contactData.jobTitle || '',
            address1: contactData.address1 || '',
            address2: contactData.address2 || '',
            pincode: contactData.pincode || '',
            city: contactData.city || '',
            district: contactData.district || '',
            state: contactData.state || '',
            interestedProduct: contactData.interestedProduct || '',
            chitAmount: contactData.chitAmount || '',
            source: contactData.source || '',
            group: contactData.group || '',
            leadBranch: contactData.leadBranch || 'Tamil Nadu',
            leadAssignedTo: contactData.leadAssignedTo || 'Tamil Nadu'
          });
        } else {
          throw new Error('Contact not found');
        }
      } catch (err) {
        console.error("Error fetching contact:", err);
        setError(err.message);
        alert(`Error loading contact: ${err.message}`);
        navigate('/contact');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactData();
  }, [contactId, getData, navigate]);

  useEffect(() => {
    if (isSubmitted && Object.keys(errors).length > 0) {
      const firstErrorField = document.getElementById(Object.keys(errors)[0]);
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErrorField.focus();
      }
    }
  }, [errors, isSubmitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formValues.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }
    
    if (!formValues.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formValues.mobileNumber)) {
      newErrors.mobileNumber = 'Enter a valid 10-digit mobile number';
    }

    if (formValues.emailId && !/^\S+@\S+\.\S+$/.test(formValues.emailId)) {
      newErrors.emailId = 'Enter a valid email address';
    }
    
    if (formValues.pincode && !/^\d{6}$/.test(formValues.pincode)) {
      newErrors.pincode = 'Enter a valid 6-digit pincode';
    }
  
    if (!formValues.interestedProduct || formValues.interestedProduct === 'Select') {
      newErrors.interestedProduct = 'Please select a product';
    }
    
    if (!formValues.chitAmount) {
      newErrors.chitAmount = 'Chit amount is required';
    } else if (isNaN(formValues.chitAmount) || parseFloat(formValues.chitAmount) <= 0) {
      newErrors.chitAmount = 'Enter a valid chit amount';
    }
    
    if (!formValues.source || formValues.source === 'Select') {
      newErrors.source = 'Please select a source';
    }
    
    if (!formValues.group || formValues.group === 'Select') {
      newErrors.group = 'Please select a group';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);  
      const errorMessages = Object.values(validationErrors);
      alert(`Please correct the following errors:\n\n${errorMessages.join('\n')}`);
      return;
    }

    try {
      setIsLoading(true);
      
      // Use async/await with updateContact
      const updatedContact = await updateContact(contactId, {
        name: formValues.customerName,
        mobile: formValues.mobileNumber,
        altnumber: formValues.altMobileNumber,
        emailid: formValues.emailId,
        jobTitle: formValues.jobTitle,
        address1: formValues.address1,
        address2: formValues.address2,
        pincode: formValues.pincode,
        city: formValues.city,
        district: formValues.district,
        state: formValues.state,
        interestedProduct: formValues.interestedProduct,
        chitAmount: formValues.chitAmount,
        source: formValues.source,
        group: formValues.group,
        leadBranch: formValues.leadBranch,
        leadAssignedTo: formValues.leadAssignedTo
      });
      
      console.log('Contact updated successfully:', updatedContact);
      alert('Contact updated successfully!');
      navigate('/contact');
    } catch (err) {
      console.error("Error updating contact:", err);
      alert(`Error updating contact: ${err.message}`);
    } finally {
      setIsLoading(false);
      setErrors({});
      setIsSubmitted(false);
    }
  };

  // Clear form function
  const handleClear = () => {
    setFormValues({
      customerName: '',
      mobileNumber: '',
      altMobileNumber: '',
      emailId: '',
      jobTitle: '',
      address1: '',
      address2: '',
      pincode: '',
      city: '',
      district: '',
      area: '',
      state: '',
      country: '',
      landmark: '',
      interestedProduct: '',
      chitAmount: '',
      source: '',
      group: '',
      leadBranch: 'Tamil Nadu',
      leadAssignedTo: 'Tamil Nadu'
    });
    setErrors({});
    setIsSubmitted(false);
  };

  // Display loading indicator while data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  // Display error message if there was an error
  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
        <button 
          onClick={() => navigate('/contact')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Contacts
        </button>
      </div>
    );
  }

  return (
    <div className="flex-2 overflow-x-auto p-6 max-w-4xl mx-auto">
      <h1 className="font-bold text-2xl mb-4">Customer Info</h1>
      <hr className="border-gray-200 mb-6" />

      <h2 className="text-gray-500 font-medium mb-2">Customer Details</h2>
      <hr className="border-gray-200 mb-6" />

      <form onSubmit={handleSubmit} className="space-y-8" ref={errorRef}>
        <div className="p-6 bg-white shadow-sm rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
                Customer Name: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="customerName"
                id="customerName"
                value={formValues.customerName}
                onChange={handleChange}
                className={`w-full p-2 border border-l-2 border-l-[red] rounded-[0.2rem] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.customerName ? 'border-red-500' : ''}`}
              />
              {errors.customerName && (
                <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
                Mobile Number: <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="mobileNumber"
                id="mobileNumber"
                value={formValues.mobileNumber}
                onChange={handleChange}
                className={`w-full p-2 border border-l-2 border-l-[red] rounded-[0.2rem] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.mobileNumber ? 'border-red-500' : ''}`}
              />
              {errors.mobileNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="altMobileNumber" className="block text-sm font-medium text-gray-700">
                Alternate Mobile Number:
              </label>
              <input
                type="tel"
                name="altMobileNumber"
                id="altMobileNumber"
                value={formValues.altMobileNumber}
                onChange={handleChange}
                className="w-full p-2 border border-l-2 border-l-[green] rounded-[0.2rem] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="emailId" className="block text-sm font-medium text-gray-700">
                Email ID:
              </label>
              <input
                type="email"
                name="emailId"
                id="emailId"
                value={formValues.emailId}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 border-l-2 border-l-[green] rounded-[0.2rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.emailId ? 'border-red-500' : ''}`}
              />
              {errors.emailId && (
                <p className="text-red-500 text-xs mt-1">{errors.emailId}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                Job-Title/Occupation:
              </label>
              <input
                type="text"
                name="jobTitle"
                id="jobTitle"
                value={formValues.jobTitle}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 border-l-2 border-l-[green] rounded-[0.2rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-gray-500 font-medium mb-2">Residence Details</h2>
          <hr className="border-gray-200 mb-6" />
          
          <div className="p-6 bg-white shadow-sm rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-2">
                <label htmlFor="address1" className="block text-sm font-medium text-gray-700">
                  Address Line 1:
                </label>
                <input
                  type="text"
                  name="address1"
                  id="address1"
                  value={formValues.address1}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 border-l-2 border-l-[green] rounded-[0.2rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="address2" className="block text-sm font-medium text-gray-700">
                  Address Line 2:
                </label>
                <input
                  type="text"
                  name="address2"
                  id="address2"
                  value={formValues.address2}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 border-l-2 border-l-[green] rounded-[0.2rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                  Pincode:
                </label>
                <input
                  type="text"
                  name="pincode"
                  id="pincode"
                  value={formValues.pincode}
                  onChange={handleChange}
                  className={`w-full p-2 border border-gray-300 border-l-2 border-l-[green] rounded-[0.2rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.pincode ? 'border-red-500' : ''}`}
                />
                {errors.pincode && (
                  <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City:
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formValues.city}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 border-l-2 border-l-[green] rounded-[0.2rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                  District:
                </label>
                <input
                  type="text"
                  name="district"
                  id="district"
                  value={formValues.district}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 border-l-2 border-l-[green] rounded-[0.2rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State:
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={formValues.state}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 border-l-2 border-l-[green] rounded-[0.2rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-gray-500 font-medium mb-2">Product Details</h2>
          <hr className="border-gray-200 mb-6" />
          
          <div className="p-6 bg-white shadow-sm rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-2">
                <label htmlFor="interestedProduct" className="block text-sm font-medium text-gray-700">
                  Interested Product: <span className="text-red-500">*</span>
                </label>
                <select 
                  name="interestedProduct" 
                  id="interestedProduct"
                  value={formValues.interestedProduct}
                  onChange={handleChange}
                  className={`w-full p-2 border border-gray-300 border-l-2 border-l-[red] rounded-[0.2rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.interestedProduct ? 'border-red-500' : ''}`}
                >
                  <option value="">Select</option>
                  <option value="Chit">Chit</option>
                </select>
                {errors.interestedProduct && (
                  <p className="text-red-500 text-xs mt-1">{errors.interestedProduct}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="chitAmount" className="block text-sm font-medium text-gray-700">
                  Chit Amount: <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number"
                  name="chitAmount"
                  id="chitAmount"
                  value={formValues.chitAmount}
                  onChange={handleChange}
                  className={`w-full p-2 border border-gray-300 border-l-2 border-l-[red] rounded-[0.2rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.chitAmount ? 'border-red-500' : ''}`}
                />
                {errors.chitAmount && (
                  <p className="text-red-500 text-xs mt-1">{errors.chitAmount}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                  Source: <span className="text-red-500">*</span>
                </label>
                <select 
                  name="source" 
                  id="source"
                  value={formValues.source}
                  onChange={handleChange}
                  className={`w-full p-2 border border-gray-300 border-l-2 border-l-[red] rounded-[0.2rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.source ? 'border-red-500' : ''}`}
                >
                  <option value="">Select</option>
                  <option value="Existing Customer">Existing Customer</option>
                  <option value="FaceBook">FaceBook</option>
                  <option value="Landing Page">Landing Page</option>
                  <option value="Missed Call">Missed Call</option>
                  <option value="Walk In">Walk In</option>
                  <option value="Web Enquiry">Web Enquiry</option>
                </select>
                {errors.source && (
                  <p className="text-red-500 text-xs mt-1">{errors.source}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="group" className="block text-sm font-medium text-gray-700">
                  Group: <span className="text-red-500">*</span>
                </label>
                <select 
                  name="group" 
                  id="group"
                  value={formValues.group}
                  onChange={handleChange}
                  className={`w-full p-2 border border-gray-300 border-l-2 border-l-[red] rounded-[0.2rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.group ? 'border-red-500' : ''}`}
                >
                  <option value="">Select</option>
                  <option value="Borrower">Borrower</option>
                  <option value="Digital">Digital</option>
                  <option value="Investor">Investor</option>
                  <option value="Moderate Investor">Moderate Investor</option>
                </select>
                {errors.group && (
                  <p className="text-red-500 text-xs mt-1">{errors.group}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="leadBranch" className="block text-sm font-medium text-gray-700">
                  Lead Branch:
                </label>
                <input
                  type="text"
                  name="leadBranch"
                  id="leadBranch"
                  value={formValues.leadBranch}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 border-l-2 border-l-[green] rounded-[0.2rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="leadAssignedTo" className="block text-sm font-medium text-gray-700">
                  Lead Assigned To:
                </label>
                <input
                  type="text"
                  name="leadAssignedTo"
                  id="leadAssignedTo"
                  value={formValues.leadAssignedTo}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 border-l-2 border-l-[green] rounded-[0.2rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        {(user && user.role === "Admin") && (
        <div className="flex space-x-4">
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 text-white rounded-[0.5rem] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Contact'}
          </button>
          <button 
            type="button" 
            onClick={handleClear}
            className="px-4 py-2 bg-gray-400 text-gray-700 rounded-[0.5rem] hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            disabled={isLoading}
          >
            Clear
          </button>
        </div>
        )}
      </form>
    </div>
  );
};
    
export default Editcontact;