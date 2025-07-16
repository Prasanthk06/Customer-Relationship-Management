import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useContact} from '../context/ContactContext';
import { useAuth } from '../context/AuthContext';
import Modetails from '../components/Modetails';

const Contactlist = () => {
  const {user} = useAuth();
  const [filter, setfilter] = useState('');
  const {contacts}= useContact();
  const [error,setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isTableView,setIsTableView] = useState(false);
  const [showMoModal,setShowMoModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  

  const filtercontacts = contacts.filter((contact) =>{
    const matchname = filter === ''|| 
    contact.name.toLowerCase().includes(filter.toLowerCase())

    return matchname ;
  })

  const handleShowMoClick = (contact)=>{
    setSelectedContact(contact);
    setShowMoModal(true);
  }

  return (
    <div className="w-full bg-white">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center py-5 md:px-4 px-4 border-b">
        <h1 className="text-2xl font-bold text-gray-800">Contacts</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className='relative w-full sm:w-auto'>
            <input type="text"
             placeholder='Filter By name'
             value={filter}
             onChange={(e) => setfilter(e.target.value)}
             className='pl-3 pr-10 py-2'
            /> 
            {filter && (
              <button onClick={() => setfilter('')}
              className='absolute right-2 top-2 text-gray-500 hover:text-gray-700'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>   
              </button>
            )}           
          </div>
          <Link to="/import" className="flex items-center gap-2 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
            </svg>
            Import
          </Link>
          {( user.role === "Admin" ) && ( 
          <Link to="/addContact" className="flex items-center gap-2 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add
          </Link>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table headers - hidden in small screens but visible in larger screens */}
          <thead className="bg-white">
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th scope="col" className="px-6 py-3">Customer Name</th>
              <th scope="col" className="px-6 py-3">Mobile Number</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Sub Status</th>
              <th scope="col" className="px-6 py-3">Next Follow Up Date</th>
              <th scope="col" className="px-6 py-3">Lead Created Date</th>
              <th scope="col" className="px-6 py-3" colSpan="2"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtercontacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                {/* Customer Name */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-500 md:hidden">Customer Name</div>
                    <div className="font-medium text-gray-900">{contact.name}</div>
                  </div>
                </td>

                {/* Mobile Number */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-500 md:hidden">Mobile Number</div>
                    <div className="text-gray-900">{contact.mobile}</div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-500 md:hidden">Status</div>
                    <div className="text-gray-900">{contact.status}</div>
                  </div>
                </td>

                {/* Sub Status */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-500 md:hidden">Sub Status</div>
                    <div className="text-gray-900">{contact.subStatus}</div>
                  </div>
                </td>

                {/* Next Follow Up Date */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-500 md:hidden">Next Follow Up Date</div>
                    <div className="text-gray-900">{contact.nextFollowUp}</div>
                  </div>
                </td>

                {/* Lead Created Date */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-500 md:hidden">Lead Created Date</div>
                    <div className="text-gray-900">{contact.leadCreated}</div>
                  </div>
                </td>

                {/* Action Links */}
                <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleShowMoClick(contact)}
                    className="inline-block bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded text-center"
                  >
                    Show MO
                  </button>
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link 
                    to={{
                      pathname:'/edit'
                    }} 
                    state={{contactId:contact.id}}
                    className="inline-block bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded text-center"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!isLoading && !error && filtercontacts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <p>No Contacts found. {filter && 'Try changing your filter.'}</p>
        </div>
      )}

      <Modetails
        show={showMoModal}
        onClose={() => setShowMoModal(false)}
        contactData={selectedContact}
      />
    </div>

  );
};

export default Contactlist;
