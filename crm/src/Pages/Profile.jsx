import React from 'react';
import { useAuth } from '../context/AuthContext'; 
const Profile = () => {
  const { user, loading } = useAuth();  // Properly destructure both user and loading
  
  if (loading) {
    return <div className="p-4">Loading profile...</div>;
  }
  
  if (!user) {
    return <div className="p-4">Please log in to view your profile.</div>;
  }
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="bg-white p-6 shadow-2xl rounded-lg ">
        <div className="mb-4">
          <span className="block text-gray-500 text-sm">Username</span>
          <span className="block text-lg font-medium">{user.username}</span>
        </div>
        <div className="mb-4">
          <span className="block text-gray-500 text-sm">User ID</span>
          <span className="block text-lg font-medium">{user.id}</span>
        </div>

         <div className='mb-4'>
            <span className='block text-gray-500 text-sm'>Role</span>
            <span className='block text-lg font-medium'>{user.role}</span>
         </div>
      </div>
    </div>
  );
};

export default Profile;