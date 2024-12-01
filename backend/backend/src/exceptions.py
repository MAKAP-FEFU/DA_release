from fastapi import HTTPException


class CustomHTTPException(HTTPException):
    key = None
    message = None
    status_code = None
    def __init__(self):
        super().__init__(status_code=self.status_code, detail={"data": {"message": {self.key: self.message}}})


class UserExists(CustomHTTPException):
    key = 'username'
    message = 'Пользователя с таким username уже существует'
    status_code = 403


class Unauthorized(CustomHTTPException):
    key = 'token'
    message = 'null'
    status_code = 403

class UserNotExists(CustomHTTPException):
    key = 'username'
    message = 'Пользователя с таким username не существует'
    status_code = 403

class InvalidCreditionals(CustomHTTPException):
    key = 'username'
    message = 'Неверный логин или пароль'
    status_code = 403

class Expired(CustomHTTPException):
    key = 'token'
    message = 'Действие токена истекло'
    status_code = 403