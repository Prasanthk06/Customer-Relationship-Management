import React from "react";
import Sidenav from "./Sidenav";

const Applayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidenav />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Applayout;