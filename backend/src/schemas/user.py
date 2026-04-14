from pydantic import BaseModel, EmailStr, ConfigDict

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None

class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)
    id: int