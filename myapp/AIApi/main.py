from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq_chat import chat_with_groq  # Changed from relative import to direct import

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://rag-agent-frontend-xi.vercel.app",
        "https://rag-agent-frontend-git-main-zarrarahmedkhans-projects.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    text: str

@app.post("/test")
async def test_endpoint(message: Message):
    """
    Endpoint to chat with Groq AI
    
    Args:
        message: Message object containing the text to send to Groq
    
    Returns:
        dict: Contains the AI's response
    """
    try:
        response = chat_with_groq(message.text)
        return {"response": response}
    except Exception as e:
        return {"error": str(e)}