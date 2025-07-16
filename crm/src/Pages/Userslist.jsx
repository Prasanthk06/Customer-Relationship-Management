import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Userslist = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setError(null);
    } catch (err) {
      console.log("Error fetching data", err);
      setError("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/auth/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers(users.map((u) => (u._id === userId ? { ...u, role: newRole } : u)));

      setSuccessMessage("Role updated successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.log("Error updating role", err);
      setError("Failed to update role");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDelete = async (userId, username) => {
    if (!window.confirm(`Are you sure you want to delete ${username}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/auth/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.filter((u) => u._id !== userId));
      setSuccessMessage("User deleted successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.log("Error deleting data", err);
      setError("Error deleting user");
      setTimeout(() => setError(""), 3000);
    }
  };

  const filteredUsers = users.filter((userItem) => {
    return (
      filter === "" ||
      (userItem.username && userItem.username.toLowerCase().includes(filter.toLowerCase()))
    );
  });

  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center py-5 md:px-4 px-4 border-b">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <div className="flex flex-col sm:flex-row gap-3 mt-3 md:mt-0">
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Filter by username"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-3 pr-10 py-2 border rounded w-full sm:w-auto"
            />
            {filter && (
              <button
                onClick={() => setFilter("")}
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
          {user.role === "Admin" && (
            <Link
              to="/signup"
              className="flex items-center gap-2 font-medium bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add User
            </Link>
          )}
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="m-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="m-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      )}

      {/* Table */}
      {!isLoading && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th scope="col" className="px-6 py-3">Username</th>
                <th scope="col" className="px-6 py-3">Role</th>
                <th scope="col" className="px-6 py-3">Created At</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3" colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((userItem) => (
                <tr key={userItem._id} className="hover:bg-gray-50">
                  {/* Username */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="text-xs text-gray-500 md:hidden">Username</div>
                      <div className="font-medium text-gray-900">{userItem.username}</div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="text-xs text-gray-500 md:hidden">Role</div>
                      {user.role === "Admin" && userItem._id !== user._id ? (
                        <select
                          value={userItem.role}
                          onChange={(e) => handleRoleChange(userItem._id, e.target.value)}
                          className="border rounded px-2 py-2 text-sm"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Manager">Manager</option>
                          <option value="User">User</option>
                        </select>
                      ) : (
                        <div className="text-gray-900">{userItem.role}</div>
                      )}
                    </div>
                  </td>

                  {/* Created At */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="text-xs text-gray-500 md:hidden">Created At</div>
                      <div className="text-gray-900">
                        {userItem.createdAt
                          ? new Date(userItem.createdAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            })
                          : "N/A"}
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="text-xs text-gray-500 md:hidden">Status</div>
                      <div
                        className={`inline-flex px-2 py-3 rounded-lg text-xs font-semibold ${
                          userItem.isActive !== false
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {userItem.isActive !== false ? "Active" : "Disabled"}
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-2 py-4 whitespace-nowrap text-sm font-medium">
                    {user.role === "Admin" && userItem._id !== user._id && (
                      <div className="flex ml-3">
                        <button
                          onClick={() => handleDelete(userItem._id, userItem.username)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredUsers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <p>No users found. {filter && "Try changing your filter."}</p>
        </div>
      )}
    </div>
  );
};

export default Userslist;