import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContact } from "../context/ContactContext";

const Addcontact = () => {
  const {user} = useAuth();
  const errorRef = useRef(null);
  const navigate = useNavigate();
  const {addcontact} = useContact();
  
  

  const [formValues, setFormValues] = useState({
    customerName: '',
    mobileNumber: '',
    altMobileNumber: '',
    emailId: '',
    jobTitle: 'Prasanth',
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
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);  
      const errorMessages = Object.values(validationErrors);
      alert(`Please correct the following errors:\n\n${errorMessages.join('\n')}`);
      return;
    }

    alert('Form submitted successfully!');
    console.log('Form values:', formValues);
    
    const newContact = addcontact({
      name: formValues.customerName,
      mobile: formValues.mobileNumber,
      altnumber: formValues.altMobileNumber,
      emailid: formValues.emailId,
      jobTitle: formValues.jobTitle,
      status: 'Open',
      address1:formValues.address1,
      address2:formValues.address2,
      pincode:formValues.pincode,
      district:formValues.district,
      state:formValues.state,
      subStatus: 'Fresh Lead',
      source: formValues.source,
      group: formValues.group,
      chitAmount: formValues.chitAmount
    })

    setErrors({});
    setIsSubmitted(false);

    navigate('/contact')
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

        <div className="flex space-x-4">
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 text-white rounded-[0.5rem] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
          <button 
            type="button" 
            onClick={handleClear}
            className="px-4 py-2 bg-gray-400 text-gray-700 rounded-[0.5rem] hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addcontact;