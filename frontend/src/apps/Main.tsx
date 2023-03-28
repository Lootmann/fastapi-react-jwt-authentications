import React, { useEffect, useState } from "react";
import { AuthenticatedGuard } from "../auths/AuthenticatedGuard";
import { axiosDefault } from "../apis/axios";
import { getAccessToken } from "../apis/token";
import { useNavigate } from "react-router-dom";

export function Main() {
  // TODO: authenticated with useContext
  const [users, setUsers] = useState<UserType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(">>> Main.tsx useEffect");

    const accessToken = getAccessToken();
    axiosDefault
      .get("/users", { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((resp) => {
        if (resp.status == 200) {
          setUsers(resp.data);
        }
      })
      .catch((error) => {
        navigate("/login");
      });
  }, []);

  return (
    <AuthenticatedGuard>
      <div className="min-h-screen bg-zinc-800 text-zinc-200 text-xl p-4">
        <h2 className="text-xl pb-2">AuthenticatedGuard</h2>

        <hr />

        <p className="pt-2">You're logged in</p>

        <ul>
          {users.map((user) => {
            return (
              <li key={user.id}>
                {user.id}. {user.username}
              </li>
            );
          })}
        </ul>
      </div>
    </AuthenticatedGuard>
  );
}
