import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auths/AuthContext";
import { axiosWithToken } from "../apis/axios";
import { useNavigate } from "react-router-dom";

export function Users() {
  const authUser = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      console.log(">>> Users.tsx");

      axiosWithToken
        .get("/users")
        .then((resp) => {
          if (resp.status == 200) {
            console.log(resp);
            console.log(resp.data);
            setUsers(resp.data);
          } else {
            // TODO: when is this happened?
            return navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error);
          return navigate("/login");
        });
    };

    fetchUser();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="border p-4 rounded-md">
        {authUser && (
          <>
            <p className="bg-zinc-600 p-2 rounded-md">
              Logged In: {authUser.id} - {authUser.username}
            </p>
          </>
        )}
      </div>

      <div className="border p-4 rounded-md">
        <h2 className="text-xl">User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.id}. {user.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
