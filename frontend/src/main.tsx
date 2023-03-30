import App from "./components/App";
import React from "react";
import ReactDOM from "react-dom/client";
import { Login, userLoginAction } from "./auths/Login";
import { Main } from "./apps/Main";
import { Signup, userCreateAction } from "./auths/Signup";
import { Users } from "./apps/Users";
import {
  createBrowserRouter,
  LoaderFunction,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/signup",
        element: <Signup />,
        action: userCreateAction as LoaderFunction,
      },
      {
        path: "/login",
        element: <Login />,
        action: userLoginAction as LoaderFunction,
      },
    ],
  },
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/app",
        element: <Users />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
