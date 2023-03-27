import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

function App() {
  // TODO: sidebar Authenticate

  return (
    <div className="flex min-h-screen bg-slate-600">
      <Sidebar />

      <div className="pl-44">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
