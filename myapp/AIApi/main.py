from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq_chat import chat_with_groq  # Changed from relative import to direct import

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
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