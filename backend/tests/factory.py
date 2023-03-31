from random import randint, sample
from string import ascii_letters

from fastapi.testclient import TestClient

from api.models import auths as auth_model


def random_string(min_: int = 5, max_: int = 10) -> str:
    s = ascii_letters
    while max_ > len(s):
        s += s
    return "".join(sample(ascii_letters, randint(min_, max_)))


def get_access_token_header(
    client: TestClient, username: str, password: str
) -> auth_model.Token:
    resp = client.post(
        "/auth/token",
        data={"username": username, "password": password},
        headers={"content-type": "application/x-www-form-urlencoded"},
    )
    token = auth_model.Token(**resp.json())
    return token
