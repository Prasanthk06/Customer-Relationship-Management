import React, { useState } from "react";
import { Link } from "react-router-dom";

const Unallocated = () => {
  const [name, setName] = useState("");
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

  const filterContacts = contacts.filter((contact) => {
    const matchName =
      name === "" || contact.customer.toLowerCase().includes(name.toLowerCase());
    return matchName;
  });

  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center py-5 px-4 border-b">
        <h1 className="text-2xl font-bold text-gray-800">Unallocated Contacts</h1>
        <div className="relative mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Filter by name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-3 pr-10 py-2 border rounded w-full md:w-auto"
          />
          {name && (
            <button
              onClick={() => setName("")}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Headers */}
          <thead className="bg-white">
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th scope="col" className="px-6 py-3">Customer Name</th>
              <th scope="col" className="px-6 py-3">Mobile Number</th>
              <th scope="col" className="px-6 py-3">Group</th>
              <th scope="col" className="px-6 py-3">Source</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filterContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                {/* Customer Name */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-500 md:hidden">Customer Name</div>
                    <div className="font-medium text-gray-900">{contact.customer}</div>
                  </div>
                </td>

                {/* Mobile Number */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-500 md:hidden">Mobile Number</div>
                    <div className="text-gray-900">{contact.mobile}</div>
                  </div>
                </td>

                {/* Group */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-500 md:hidden">Group</div>
                    <div className="text-gray-900">{contact.group}</div>
                  </div>
                </td>

                {/* Source */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-500 md:hidden">Source</div>
                    <div className="text-gray-900">{contact.source}</div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-500 md:hidden">Status</div>
                    <div className="text-gray-900">{contact.status}</div>
                  </div>
                </td>

                {/* Assign Button */}
                <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/view/${contact.id}`}
                    className="inline-block bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded text-center"
                  >
                    Assign
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Unallocated;