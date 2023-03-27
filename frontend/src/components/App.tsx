import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

function App() {
  return (
    <div className="flex">
      <Sidebar />/
      <Outlet />
    </div>
  );
}

export default App;
