from pydantic import BaseModel, ConfigDict

class TaskBase(BaseModel):
    title: str
    description: str | None = None

class TaskCreate(TaskBase):
    user_id: int

class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    user_id: int | None = None

class TaskResponse(TaskBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    user_id: int