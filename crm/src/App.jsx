import React from "react";
import Addcontact from "./Pages/Addcontact";
import Dashboard from "./Pages/Dashboard";
import Contactlist from "./Pages/Contactlist";
import Rep from "./Pages/Rep";
import Lead from "./Pages/Lead";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Applayout from "./components/Applayout";
import Editcontact from "./Pages/Editcontact";
import Unallocated from "./Pages/Unallocated";
import { ContactProvider } from "./context/ContactContext";
import Signin from "./Pages/Signin";
import Profile from "./Pages/Profile";
import Signup from "./Pages/Signup";
import {RoleRoute} from './context/RoleRoute'
import { AuthProvider, useAuth } from "./context/AuthContext";
import Unathorized from "./Pages/Unathorized";
import Userslist from "./Pages/Userslist";
import { Analysis } from "./components/Analysis";
import Import from "./Pages/Import";
const App = () => {
  return (
    <ContactProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Navigate to="/signin" replace />} />
            <Route path= "/analysis" element = {<Analysis />} />
            <Route path="/unauthorized" element={<Unathorized />}></Route>


            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Applayout>
                  <Dashboard />
                </Applayout>
              </ProtectedRoute>
            } />

            <Route path='/import' element={
              <ProtectedRoute>
                <Applayout>
                  <Import></Import>
                </Applayout>
              </ProtectedRoute>
            }>

            </Route>

            <Route path="/profile" element={
               <ProtectedRoute>
                  <Applayout>
                    <Profile></Profile>
                  </Applayout>
               </ProtectedRoute>
            }/>

            <Route path="/users" element ={
              <ProtectedRoute>
                  <Applayout>
                    <Userslist></Userslist>
                  </Applayout>
              </ProtectedRoute>
            }/>

            <Route path="/contact" element={
              <RoleRoute allowedRoute = {["Admin","Manager"]}>
                <Applayout>
                  <Contactlist />
                </Applayout>
              </RoleRoute>
            } />

            <Route path="/addContact" element={
              <RoleRoute allowedRoute = {["Admin"]}>
                <Applayout>
                  <Addcontact />
                </Applayout>
              </RoleRoute>
            } />

            <Route path="/unallocated" element={
              <RoleRoute allowedRoute = {["Admin","Manager","User"]}>
                <Applayout>
                  <Unallocated />
                </Applayout>
              </RoleRoute>
            } />

            <Route path="/lead" element={
              <RoleRoute allowedRoute = {["Admin","Manager"]}>
                <Applayout>
                  <Lead />
                </Applayout>
              </RoleRoute>
            } />

            <Route path="/unall" element={
              <RoleRoute allowedRoute = {["Admin","Manager","User"]}>
                <Applayout>
                  <Rep />
                </Applayout>
              </RoleRoute>
            } />

            <Route path="/edit" element={
              <RoleRoute allowedRoute = {["Admin","Manager"]}>
                <Applayout>
                  <Editcontact />
                </Applayout>
              </RoleRoute>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ContactProvider>
  );
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
    </div>;
  }
  
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  
  return children;
};

export default App;