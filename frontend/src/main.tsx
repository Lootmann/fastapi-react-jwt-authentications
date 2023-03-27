import App from "./components/App";
import React from "react";
import ReactDOM from "react-dom/client";
import { Login } from "./auths/Login";
import { Signup, userCreateAction } from "./auths/Signup";
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
        path: "/login",
        element: <Signup />,
        action: userCreateAction as LoaderFunction,
      },
      {
        path: "/signup",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
