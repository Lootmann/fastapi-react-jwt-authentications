import React, { useEffect } from "react";
import { AuthenticatedGuard } from "../auths/AuthenticatedGuard";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export function Main() {
  return (
    <AuthenticatedGuard>
      <div className="min-h-screen bg-zinc-800 text-zinc-200 text-xl p-4">
        <Sidebar />

        <div className="pl-44">
          <h2 className="text-xl pb-2">AuthenticatedGuard</h2>
          <hr />
          <Outlet />
        </div>
      </div>
    </AuthenticatedGuard>
  );
}
