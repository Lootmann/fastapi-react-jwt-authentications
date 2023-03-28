import React, { useEffect } from "react";
import { axiosDefault } from "../apis/axios";
import { getAccessToken, getRefreshToken, setAccessToken } from "../apis/token";
import { useNavigate } from "react-router-dom";

export function AuthenticatedGuard({ children }: any) {
  const accessToken = getAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    // FIXME: ugly
    // FIXME: /src/apis/axios.ts
    console.log(">>> AuthenticatedGuard.tsx useEffect");

    const fetchUser = async () => {
      await axiosDefault
        .get("/users", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((resp) => {
          console.log(resp);
          console.log(resp.data);

          if (resp.status == 200) {
            console.log("* good");
          } else {
            // NOTE: something with wrong D:
            navigate("/login");
            return resp;
          }
        })
        .catch((error) => {
          // TODO: refresh Token
          // NOTE: when 401 error, use refresh_token, get new access Token
          console.log("* accessToken is expired ?");
          const refreshToken = getRefreshToken();

          if (refreshToken === null) {
            navigate("/login");
          }

          axiosDefault
            .post("/auth/refresh", { refresh_token: refreshToken })
            .then((resp) => {
              if (resp.status == 200) {
                console.log("* refresh token");
                setAccessToken(resp.data.access_token);
              }
            })
            .catch((error) => {
              console.log("* refresh error");
              console.log(error);
              navigate("/login");
            });
        });
    };

    fetchUser();
  }, []);

  return <>{children}</>;
}
