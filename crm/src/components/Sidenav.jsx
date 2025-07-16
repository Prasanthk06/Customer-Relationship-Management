import React, { useState } from "react";
import {
  BarChart,
  User,
  Contact,
  ChevronDown,
  ChevronRight,
  LogOut,
  Users,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidenav = () => {
  const [reportsCollapse, setReportsCollapse] = useState(true);
  const [contactsCollapse, setContactsCollapse] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false); // State to control mobile sidenav
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const renderLinks = () => (
    <ul className="space-y-4">
      {/* Contacts Section */}
      <li>
        <button
          onClick={() => setContactsCollapse(!contactsCollapse)}
          className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-yellow-300 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Contact size={20} />
            Contacts
          </span>
          {contactsCollapse ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
        </button>
      </li>
      {!contactsCollapse && (
        <ul className="ml-6 space-y-2">
          <li>
            <Link to="/dashboard" className="block rounded-md p-2 hover:bg-yellow-300">
              Dashboard
            </Link>
          </li>
          {(user.role === "Admin" || user.role === "Manager") && (
            <li>
              <Link to="/contact" className="block rounded-md p-2 hover:bg-yellow-300">
                Contact List
              </Link>
            </li>
          )}
          <li>
            <Link to="/unallocated" className="block rounded-md p-2 hover:bg-yellow-300">
              Unallocated Contacts
            </Link>
          </li>
        </ul>
      )}

      {/* Reports Section */}
      <li>
        <button
          onClick={() => setReportsCollapse(!reportsCollapse)}
          className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-yellow-300 transition-colors"
        >
          <span className="flex items-center gap-2">
            <BarChart size={20} />
            Reports
          </span>
          {reportsCollapse ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
        </button>
      </li>
      {!reportsCollapse && (
        <ul className="ml-6 space-y-2">
          {(user.role === "Admin" || user.role === "Manager") && (
            <li>
              <Link to="/lead" className="block rounded-md p-2 hover:bg-yellow-300">
                Lead Status Report
              </Link>
            </li>
          )}
          <li>
            <Link to="/unall" className="block rounded-md p-2 hover:bg-yellow-300">
              Unallocated Report
            </Link>
          </li>
        </ul>
      )}

      {/* Profile */}
      <li>
        <Link to="/profile" className="flex items-center gap-2 p-2 rounded-md hover:bg-yellow-300">
          <User size={20} />
          My Profile
        </Link>
      </li>

      {/* User Management */}
      {user.role === "Admin" && (
        <li>
          <Link to="/users" className="flex items-center gap-2 p-2 rounded-md hover:bg-yellow-300">
            <Users size={20} />
            User Management
          </Link>
        </li>
      )}
    </ul>
  );

  return (
    <div className="flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-yellow-200 text-black font-bold min-h-screen relative">
        <div className="border-b p-4">
          <h1 className="text-3xl">Carry Finance</h1>
        </div>
        <nav className="p-4">{renderLinks()}</nav>

        {/* Logout */}
        <div className="absolute bottom-8 left-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-700 py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden w-full bg-yellow-200 flex justify-between items-center p-4">
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30"
            onClick={() => setMobileOpen(false)} // Close the sidebar when clicking outside
          ></div>

          {/* Sidebar */}
          <div className="relative w-3/4 sm:w-2/3 bg-yellow-200 h-full p-4 overflow-y-auto">
            {renderLinks()}
            <div className="mt-10">
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false); // Close the sidebar after logout
                }}
                className="flex items-center gap-2 text-red-700 py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidenav;