from fastapi import APIRouter
from pydantic import BaseModel
from src.services.ai_service import ai_service
from src.services.system_service import get_system_metrics

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/")
async def chat(request: ChatRequest):
    sys = get_system_metrics()
    context = f"CPU: {sys['cpu']}%, RAM: {sys['memory']}%, NET: {sys['recv']}MB"
    response = ai_service.chat(request.message, context)
    return {"response": response}
