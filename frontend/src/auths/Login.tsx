import { axiosForm } from "../apis/axios";
import { setAccessToken, setRefreshToken } from "../apis/token";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";

// TODO: when logging is success, redirect app
export function Login() {
  const errors = useActionData() as AccountFormErrorType;

  return (
    <div className="p-6">
      <h2 className="text-2xl text-slate-200 mb-4">Login Form</h2>

      <Form
        method="post"
        className="flex flex-col gap-4 p-4 text-2xl bg-slate-900 rounded-md"
      >
        {errors?.message && (
          <span className="text-red-600">{errors.message}</span>
        )}
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
          value="-> Login"
          className="bg-slate-800 hover:bg-green-600 focus:bg-green-600 text-slate-200 hover:text-slate-800 focus:text-slate-800 px-2 py-1 rounded-md transition-all duration-200 outline-none"
        />
      </Form>
    </div>
  );
}

export async function userLoginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const errors: AccountFormErrorType = {
    username: "",
    password: "",
    message: "",
  };

  if (typeof username != "string" || username.length < 5) {
    errors.username = "Username must be at least 5 chars long.";
  }

  if (typeof password != "string" || password.length < 5) {
    errors.password = "Password must be at least 5 chars long.";
  }

  if (errors.username != "" || errors.password != "") {
    return errors;
  }

  return axiosForm
    .post("/auth/token", { username: username, password: password })
    .then((resp) => {
      console.log(resp);
      console.log(resp.data);

      if (resp.status == 201) {
        // FIXME: set access_token and refresh_token to Cookie with HttpOnly
        console.log(">>> success to login");

        setAccessToken(resp.data.access_token);
        setRefreshToken(resp.data.refresh_token);
        return redirect("/app");
      } else {
        return errors;
      }
    })
    .catch((error) => {
      // /auth/token raises 401
      console.log(error);
      console.log(error.request.response);
      errors.message = error.request.response;
      return errors;
    });
}
