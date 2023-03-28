import React from "react";
import { AuthenticatedGuard } from "../auths/AuthenticatedGuard";

export function Main() {
  // TODO: authenticated with useContext
  return (
    <AuthenticatedGuard>
      <div className="min-h-screen bg-zinc-800 text-zinc-200 text-xl p-4">
        <h2 className="text-xl pb-2">AuthenticatedGuard</h2>

        <hr />

        <p className="pt-2">You're logged in</p>
      </div>
    </AuthenticatedGuard>
  );
}
