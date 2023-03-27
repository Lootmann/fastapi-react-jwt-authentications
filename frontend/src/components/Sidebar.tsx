import React from "react";
import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <div className="w-44 fixed left-0 top-0 h-screen bg-slate-800">
      <div className="flex flex-col p-6 gap-4 items-start text-xl text-slate-200">
        <h1 className="text-2xl">Sidebar</h1>

        <Link
          to={`/signup`}
          className="hover:bg-slate-300 hover:text-slate-900 px-2 rounded-md transition-all duration-150"
        >
          Signup
        </Link>

        <Link
          to={`/login`}
          className="hover:bg-slate-300 hover:text-slate-900 px-2 rounded-md transition-all duration-150"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
