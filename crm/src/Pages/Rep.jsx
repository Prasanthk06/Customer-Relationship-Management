import React, { useState } from "react";
import { useContact } from "../context/ContactContext";

const Rep = () => {
    const { contacts } = useContact();
    const [customerName, setCustomerName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [source, setSource] = useState('');
    const [group, setGroup] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const inputClass = "w-full p-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
    const selectClass = "w-full p-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

    const filtercontacts = () => {
        return contacts.filter(contact => {
            const matchname = !customerName || contact.name.toLowerCase().includes(customerName.toLowerCase());
            const matchMobile = !mobileNumber || contact.mobile.includes(mobileNumber);
            const matchsource = !source || contact.source === source;
            const matchgroup = !group || contact.group === group;

            let dateMatch = true;
            if (startDate || endDate) {
                const contactDate = new Date(contact.leadCreated.split('-').reverse().join('-'));
                
                if (startDate) {
                    const filterStart = new Date(startDate);
                    if (contactDate < filterStart) dateMatch = false;
                }
                
                if (endDate) {
                    const filterEnd = new Date(endDate);
                    filterEnd.setHours(23, 59, 59); 
                    if (contactDate > filterEnd) dateMatch = false;
                }
            }
            
            return matchname && matchMobile && matchsource && matchgroup && dateMatch;
        });
    }

    const handleDownload = () => {
        const filtered = filtercontacts();

        let csvv = "Customer Name,Mobile Number,Status,Sub Status,Next Follow Up,Lead Created,Source,Group,Chit Amount\n";
        
        filtered.forEach(contact => {
            csvv += [
                contact.name || '',
                contact.mobile || '',
                contact.status || '',
                contact.subStatus || '',
                contact.nextFollowUp || '',
                contact.leadCreated || '',
                contact.source || '',
                contact.group || '',
                contact.chitAmount || ''
            ].join(',') + '\n';
        });

        const blob = new Blob([csvv], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `unallocated-report-${new Date().toISOString().slice(0,10)}.csv`);
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    const handleClear = () => {
        setCustomerName('');
        setMobileNumber('');
        setSource('');
        setGroup('');
        setStartDate('');
        setEndDate('');
    }

    return(
        <>
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-gray-700 text-2xl font-bold mb-2">Unallocated Report</h2>
            <hr className="border-gray-300" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-5 gap-5 shadow-md bg-gray-100 rounded-lg mt-3">
                <div>
                    <input 
                        type="text" 
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className={inputClass} 
                        placeholder="Enter Customer Name" 
                    />
                </div>

                <div>
                    <input 
                        type="tel" 
                        id="mobileNumber"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className={inputClass} 
                        placeholder="Enter mobile number" 
                    />
                </div>

                <div>
                    <select 
                        id="source" 
                        value={source} 
                        onChange={(e) => setSource(e.target.value)} 
                        className={selectClass}
                    >
                        <option value="">Select Source</option>
                        <option value="Existing Customer">Existing Customer</option>
                        <option value="FaceBook">Facebook</option>
                        <option value="Landing Page">Landing Page</option>
                        <option value="Missed Call">Missed Call</option>
                        <option value="Walk In">Walk In</option>
                        <option value="Web Enquiry">Web Enquiry</option>
                    </select>
                </div>
                
                <div>
                    <select 
                        id="group" 
                        value={group} 
                        onChange={(e) => setGroup(e.target.value)} 
                        className={selectClass}
                    >
                        <option value="">Select Group</option>
                        <option value="Borrower">Borrower</option>
                        <option value="Digital">Digital</option>
                        <option value="Investor">Investor</option>
                        <option value="Moderate Investor">Moderate Investor</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="startDate" className="mb-1 ml-2 font-bold">Starting Date:</label>
                    <input 
                        type="date" 
                        id="startDate" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        className={inputClass} 
                    />
                </div>

                <div>
                    <label htmlFor="endDate" className="mb-1 ml-2 font-bold">Ending Date:</label>
                    <input 
                        type="date" 
                        id="endDate" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        className={inputClass} 
                    />
                </div>

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
        </>
    );
}
export default Rep;