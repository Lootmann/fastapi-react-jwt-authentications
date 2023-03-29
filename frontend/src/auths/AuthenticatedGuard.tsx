import React, { useEffect } from "react";
import { axiosWithToken } from "../apis/axios";
import { useNavigate } from "react-router-dom";

export function AuthenticatedGuard({ children }: any) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("* AuthenticatedGuard");

    const fetchUser = async () => {
      await axiosWithToken
        .get("/users")
        .then((resp) => {
          console.log(resp);
          console.log(resp.data);
        })
        .catch((error) => {
          console.log(error);
          return navigate("/login");
        });
    };

    fetchUser();
  }, []);

  return <>{children}</>;
}
