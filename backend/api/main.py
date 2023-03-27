from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routers.auths import router as auth_router
from api.routers.users import router as user_router

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credential=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(auth_router)
