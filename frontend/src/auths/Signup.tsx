import axios from "axios";
import React from "react";
import { ActionFunctionArgs, Form, useActionData } from "react-router-dom";
import { API_URL } from "../settings";

export function Signup() {
  const errors = useActionData() as UserFormErrorType;

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Login Form</h2>

      <Form
        method="post"
        className="flex flex-col gap-4 p-4 text-2xl bg-slate-900 rounded-md"
      >
        <input
          type="text"
          name="username"
          id="username"
          className="bg-slate-800 text-slate-200 px-2 py-1 rounded-md outline-none"
          placeholder="username"
          autoFocus
          autoComplete="off"
        />
        {errors?.username && (
          <span className="text-red-600">{errors.username}</span>
        )}

        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className="bg-slate-800 text-slate-200 px-2 py-1 rounded-md outline-none"
          autoComplete="off"
        />
        {errors?.password && (
          <span className="text-red-600">{errors.password}</span>
        )}

        <input
          type="submit"
          value="+ Signup"
          className="bg-slate-800 hover:bg-green-600 focus:bg-green-600 text-slate-200 hover:text-slate-800 focus:text-slate-800 px-2 py-1 rounded-md transition-all duration-200 outline-none"
        />
      </Form>
    </div>
  );
}

export async function userCreateAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const errors: UserFormErrorType = { username: "", password: "", message: "" };

  // TODO: validation formData
  if (typeof username != "string" || username.length < 5) {
    errors["username"] = "username should be longer than 5";
  }

  if (typeof password != "string" || password.length < 5) {
    errors["password"] = "password should be longer than 5";
  }

  if (errors.username != "" || errors.password != "") {
    return errors;
  }

  //   TODO: create user
  return await axios
    .post(API_URL + "/users", { username: username, password: password })
    .then((resp) => {
      console.log(resp);
      console.log(resp.data);

      // good call
      if (resp.status == 201) {
        // TODO: redirect to top page
        return resp;
      } else {
        // TODO: when is this happend?
        return resp;
      }
    })
    .catch((error) => {
      console.log(error);
      errors["message"] = "server error";
      return error;
    });
}
