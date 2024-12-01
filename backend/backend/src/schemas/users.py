from pydantic import BaseModel

class UserAddReq(BaseModel):
    username: str
    password: str

class UserAdd(BaseModel):
    username: str
    hashed_password: str

class User(BaseModel):
    id: int
    username: str
    hashed_password: str
