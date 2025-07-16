import React, { useState } from "react";
import * as XLSX from 'xlsx';

const Lead = () => {
  const inputClass = "w-full p-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const selectClass = "w-full p-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  
  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: '',
    product: '',
    source: '',
    group: '',
    status: '',
    subStatus: '',
    assignedTo: '',
    startDate: '',
    endDate: '',
    followUpDate: '',
    createdDate: ''
  });

  const contacts = [
    {
      id: 1,
      customer: "Bhat Atmajkumar S",
      mobile: "8976456938",
      group: "Group A",
      source: "Facebook",
      status: "New",
    },
    {
      id: 2,
      customer: "Shrikant G Pillamarap J",
      mobile: "9004098172",
      group: "Group B",
      source: "Landing Page",
      status: "In Progress",
    },
    {
      id: 3,
      customer: "Gangadhar Gangaram Pillamarapu",
      mobile: "9004039150",
      group: "Group A",
      source: "Enquiry",
      status: "New",
    },
    {
      id: 4,
      customer: "Padma G P",
      mobile: "9004039154",
      group: "Group C",
      source: "Walk-in",
      status: "Closed",
    },
    {
      id: 5,
      customer: "Kashinath N Shreepathi",
      mobile: "8433665943",
      group: "Group B",
      source: "Facebook",
      status: "In Progress",
    },
    {
      id: 6,
      customer: "Shweta G Pillamarapu",
      mobile: "9004039156",
      group: "Group A",
      source: "Enquiry",
      status: "New",
    },
    {
      id: 7,
      customer: "Varalaxmi V Sadamatula",
      mobile: "7506412119",
      group: "Group C",
      source: "Landing Page",
      status: "Closed",
    },
    {
      id: 8,
      customer: "Naresh Balraj Bojja",
      mobile: "8879589877",
      group: "Group A",
      source: "Facebook",
      status: "In Progress",
    },
  ];

  const filteredContacts = contacts.filter(contact => {
    if (formData.customerName && !contact.customer.toLowerCase().includes(formData.customerName.toLowerCase())) {
      return false;
    }
    if (formData.mobileNumber && !contact.mobile.includes(formData.mobileNumber)) {
      return false;
    }
    if (formData.group && contact.group !== formData.group) {
      return false;
    }
    if (formData.source && contact.source !== formData.source) {
      return false;
    }
    if (formData.status && contact.status !== formData.status) {
      return false;
    }
    return true;
  });

  const handleDownload = () => {
    // Use filteredContacts instead of all contacts
    const worksheet = XLSX.utils.json_to_sheet(filteredContacts);
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
    XLSX.writeFile(workbook, "Lead_Status_Report.xlsx");
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Function to clear all form fields
  const handleClear = () => {
    setFormData({
      customerName: '',
      mobileNumber: '',
      product: '',
      source: '',
      group: '',
      status: '',
      subStatus: '',
      assignedTo: '',
      startDate: '',
      endDate: '',
      followUpDate: '',
      createdDate: ''
    });
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-gray-700 text-2xl font-bold mb-3">Lead Status Report</h2>
      <hr className="border-gray-300 mb-6" />
      
      <div className="bg-gray-50 rounded-lg shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div>
          <input 
            type="text" 
            id="customerName"
            className={inputClass}
            value={formData.customerName}
            onChange={handleInputChange}
            placeholder="Enter customer name" 
          />
        </div>
        
        <div>
          <input 
            type="text" 
            id="mobileNumber"
            className={inputClass} 
            value={formData.mobileNumber}
            onChange={handleInputChange}
            placeholder="Enter mobile number" 
          />
        </div>
        
        <div>
          <select 
            id="product" 
            className={selectClass} 
            value={formData.product} 
            onChange={handleInputChange}
          >
            <option value="">Select Product</option>
            <option value="Chit">Chit</option>
          </select>
        </div>
        
        <div>
          <select 
            id="source" 
            className={selectClass} 
            value={formData.source} 
            onChange={handleInputChange}
          >
            <option value="">Select Source</option>
            <option value="Existing Customer">Existing Customer</option>
            <option value="Facebook">Facebook</option>
            <option value="Landing Page">Landing Page</option>
            <option value="Enquiry">Enquiry</option>
            <option value="Walk-in">Walk-in</option>
            <option value="Missed Call">Missed Call</option>
            <option value="Web Enquiry">Web Enquiry</option>
          </select>
        </div>
    
        <div>
          <select 
            id="group" 
            className={selectClass} 
            value={formData.group} 
            onChange={handleInputChange}
          >
            <option value="">Select Group</option>
            <option value="Group A">Group A</option>
            <option value="Group B">Group B</option>
            <option value="Group C">Group C</option>
            <option value="Borrower">Borrower</option>
            <option value="Digital">Digital</option>
            <option value="Investor">Investor</option>
            <option value="Moderate Investor">Moderate Investor</option>
          </select>
        </div>
        
        <div>
          <select 
            id="status" 
            className={selectClass} 
            value={formData.status} 
            onChange={handleInputChange}
          >
            <option value="">Select Status</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
            <option value="Enrolled">Enrolled</option>
            <option value="Interested">Interested</option>
            <option value="Interested Later">Interested Later</option>
            <option value="Not Contactable">Not Contactable</option>
            <option value="Open">Open</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        
        <div>
          <select 
            id="subStatus" 
            className={selectClass} 
            value={formData.subStatus} 
            onChange={handleInputChange}
          >
            <option value="">Select Sub Status</option>
            <option value="3months">3 Months</option>
            <option value="6months">6 Months</option>
          </select>
        </div>
        
        <div>
          <select 
            id="assignedTo" 
            className={selectClass} 
            value={formData.assignedTo} 
            onChange={handleInputChange}
          >
            <option value="">Select Assigned To</option>
            <option value="Agent1">Agent 1</option>
            <option value="Agent2">Agent 2</option>
          </select>
        </div>
    
        <div>
          <label htmlFor="startDate" className="mb-1 ml-2 font-bold">Start Date:</label>
          <input 
            type="date" 
            id="startDate" 
            className={inputClass} 
            value={formData.startDate} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div>
          <label htmlFor="endDate" className="mb-1 ml-2 font-bold">Ending Date:</label>
          <input 
            type="date" 
            id="endDate" 
            className={inputClass} 
            value={formData.endDate} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div>
          <label htmlFor="followUpDate" className="mb-1 ml-2 font-bold">FollowUp Date:</label>
          <input 
            type="date" 
            id="followUpDate" 
            className={inputClass} 
            value={formData.followUpDate} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div>
          <label htmlFor="createdDate" className="mb-1 ml-2 font-bold">Date Of Creation:</label>
          <input 
            type="date" 
            id="createdDate" 
            className={inputClass} 
            value={formData.createdDate} 
            onChange={handleInputChange} 
          />
        </div>
        
        {/* Show count of filtered records */}
        <div className="md:col-span-2 lg:col-span-4">
          <p className="text-gray-700 font-medium">
            {filteredContacts.length} records found
          </p>
        </div>
        
        {/* Buttons */}
        <div className="md:col-span-2 lg:col-span-4 flex justify-start space-x-4 mt-2">
          <button 
            onClick={handleDownload}
            style={{backgroundColor:"#003e79"}} 
            className="px-5 py-2.5 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors"
          >
            Download
          </button>
          <button 
            onClick={handleClear}
            className="px-5 py-2.5 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 focus:ring-4 focus:ring-gray-200 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
      
    
    </div>
  );
};

export default Lead;