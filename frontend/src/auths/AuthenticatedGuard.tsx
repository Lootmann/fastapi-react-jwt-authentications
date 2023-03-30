import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { axiosWithToken } from "../apis/axios";
import { getAccessToken, getRefreshToken } from "../apis/token";
import { useNavigate } from "react-router-dom";

/**
 * AuthenticatedGuard
 *
 * Auth Validation Component
 *
 * 1. check both access token and refresh token are valid
 * 2. create AuthContext
 */
export function AuthenticatedGuard({ children }: any) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  useEffect(() => {
    console.log("* AuthenticatedGuard");

    const [refreshToken, accessToken] = [getRefreshToken(), getAccessToken()];
    if (refreshToken === null || accessToken === null) {
      return navigate("/signup");
    }

    const fetchUser = async () => {
      // NOTE: check access/refresh token is expired
      await axiosWithToken
        .get("/users/me")
        .then((resp) => {
          setCurrentUser(resp.data);
        })
        .catch((error) => {
          return navigate("/login");
        });
    };

    fetchUser();
  }, []);

  return (
    <>
      {currentUser !== null && (
        <AuthContext.Provider value={currentUser}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
}
