# Mogera

## JWT Authenticated

- create access/refresh token

```
1. frontend:
  signup form: { username: "", password: ""} to backend POST /users

2. backend:
  should return { access_token: "eyJ...", refresh_token: "eyJ..."} with HTTP_201
  or
  automatically GET /auth/token, and get 2 tokens

3. frontend:
  get access_token and refresh_token and store received tokens in Cookies with HttpOnly
```

- login form
  - when I find non-exist username, server returns response immediately
  - when username is correct, but password is wrong, server returns reponse for a second.
    - At least, we know that a user with that username exists!
