import axios from "../apis/axios";
import React, { useEffect, useState } from "react";
import { getAccessToken, getRefreshToken } from "../apis/token";
import { redirect } from "react-router-dom";

export function AuthenticatedGuard({ children }: any) {
  const [users, setUsers] = useState<UserType[]>([]);
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  useEffect(() => {
    axios
      .get("/users", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((resp) => {
        if (resp.status == 200) {
          console.log(resp);
          console.log(resp.data);
          setUsers(resp.data);
        }
      })
      .catch((error) => {
        // TODO: redirect to Login Page
        console.log(error);
        redirect("/login");
      });
  }, []);

  return <>{children}</>;
}
