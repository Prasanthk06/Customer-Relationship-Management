import React from "react";
import Barr from "../components/Barr";
import Gauge from "../components/Gauge";
import Source from "../components/Source";
import Graph from "../components/Graph";
import { useAuth } from "../context/AuthContext";



const ChartWrapper = ({ children, title }) => {
  return (
    <div className="bg-white shadow p-4 rounded-lg h-full flex flex-col">
      {title && <h2 className="font-bold text-xl mb-2 text-center">{title}</h2>}
      <div className="flex-1 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const {user} = useAuth()
  return (
    <>
    <h1 className="font-bold text-2xl mt-6 ml-4 md:ml-8 lg:ml-7">Carry Finance</h1>
      <h1 className="font-bold text-2xl mt-6 ml-4 md:ml-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        <div className="bg-blue-600 text-white rounded-lg p-6 flex items-center justify-between">
          <h3 className="font-bold text-lg">Hello  {user.username}!</h3>
        </div>
        <div className="bg-green-600 text-white rounded-lg p-6 flex items-center justify-between">
          <h3 className="font-bold text-lg">Allocated Leads</h3>
        </div>
        <div className="bg-orange-400 text-white rounded-lg p-6 flex items-center justify-between">
          <h3 className="font-bold text-lg">Unallocated Leads</h3>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-gray-50 p-4  rounded-lg mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          <select
            name="state"
            id="state"
            className="p-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All States</option>
          </select>
          <select
            name="city"
            id="city"
            className="p-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Cities</option>
          </select>
          <select
            name="branch"
            id="branch"
            className="p-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Branches</option>
          </select>
          <select
            name="status"
            id="status"
            className="p-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
          </select>
          <select
            name="group"
            id="group"
            className="p-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Groups</option>
          </select>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <ChartWrapper>
          <Gauge />
        </ChartWrapper>
        <ChartWrapper>
          <Source />
        </ChartWrapper>
        <ChartWrapper>
          <Graph />
        </ChartWrapper>
      </div>
    </>
  );
};

export default Dashboard;