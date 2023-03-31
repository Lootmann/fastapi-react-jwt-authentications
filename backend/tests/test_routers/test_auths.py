import time
from datetime import datetime, timedelta

import pytest
from fastapi import HTTPException, status
from fastapi.testclient import TestClient
from jose import jwt

from api.cruds import auths as auth_api
from api.models import auths as auth_model
from api.settings import Settings
from tests.factory import random_string


class TestPostAuth:
    def test_create_user(self, client: TestClient):
        username, password = random_string(), random_string()
        resp = client.post(
            "/users",
            json={"username": username, "password": password},
        )
        assert resp.status_code == status.HTTP_201_CREATED

        resp = client.post(
            "/auth/token",
            data={"username": username, "password": password},
            headers={"content-type": "application/x-www-form-urlencoded"},
        )

        assert "access_token" in resp.json()
        assert "refresh_token" in resp.json()
        assert "token_type" in resp.json()

    def test_create_user_with_invalid_length_user(self, client: TestClient):
        resp = client.post(
            "/auth/token", data={"username": "hoge", "password": "newnew"}
        )
        assert resp.status_code == status.HTTP_401_UNAUTHORIZED
        assert resp.json() == {"detail": "Username must be at least 5 chars long."}

        resp = client.post(
            "/auth/token", data={"username": "hogehoge", "password": "k"}
        )
        assert resp.status_code == status.HTTP_401_UNAUTHORIZED
        assert resp.json() == {"detail": "Password must be at least 5 chars long."}

    def test_create_token_with_non_exist_user(self, client: TestClient):
        resp = client.post(
            "/auth/token", data={"username": "hogehoge", "password": "newnew"}
        )
        assert resp.status_code == status.HTTP_401_UNAUTHORIZED
        assert resp.json() == {"detail": "username or password is invalid"}

    def test_create_token_with_wrong_password(self, client: TestClient):
        resp = client.post(
            "/users",
            json={"username": "hhhhhh", "password": "laksdjfl"},
        )
        assert resp.status_code == status.HTTP_201_CREATED

        resp = client.post(
            "/auth/token", data={"username": "hhhhhh", "password": "newnew"}
        )
        assert resp.status_code == status.HTTP_401_UNAUTHORIZED
        assert resp.json() == {"detail": "username or password is invalid"}


class TestJWT:
    def test_invalid_jwt_with_wrong_payload(self):
        credential = Settings()

        expire = datetime.utcnow() + timedelta(credential.refresh_token_expire_minutes)
        token = jwt.encode(
            {"exp": expire}, credential.secret_key, algorithm=credential.algorithm
        )

        with pytest.raises(HTTPException):
            auth_api.check_token(token)

    def test_invalid_jwt_with_expired_date(self):
        credential = Settings()

        expire = datetime.utcnow() + timedelta(days=-1)
        token = jwt.encode(
            {"sub": "hoge", "exp": expire},
            credential.secret_key,
            algorithm=credential.algorithm,
        )

        assert auth_api.check_token(token) is False

    def test_invalid_jwt(self):
        credential = Settings()

        expire = datetime.utcnow() + timedelta(days=-1)
        token = (
            jwt.encode(
                {"sub": "hoge", "exp": expire},
                credential.secret_key,
                algorithm=credential.algorithm,
            )
            + "k"
        )

        with pytest.raises(HTTPException):
            auth_api.check_token(token)


class TestRefreshToken:
    def test_refresh_token(self, client: TestClient):
        # header: {"Authorization": "Bearer_eyJ...."}
        username, password = random_string(), random_string()
        client.post("/users", json={"username": username, "password": password})

        # get first tokens
        resp = client.post(
            "/auth/token", data={"username": username, "password": password}
        )
        old_token = auth_model.Token(**resp.json())

        # generate new access_token
        time.sleep(1)
        client.cookies = {"refresh_token": old_token.refresh_token}
        resp = client.post("/auth/refresh")
        new_token = auth_model.RefreshAccessToken(**resp.json())

        # refresh access_token
        assert old_token.access_token != new_token.access_token
