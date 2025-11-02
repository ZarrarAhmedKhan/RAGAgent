from groq import Groq
from dotenv import load_dotenv
import os

def initialize_groq_client():
    # Get the absolute path to the .env file
    env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
    
    # Load environment variables from .env file
    load_dotenv(dotenv_path=env_path, override=True)
    
    # Get API key from environment variable
    api_key = os.getenv('GROQ_API_KEY')
    if not api_key:
        raise ValueError("GROQ_API_KEY not found in environment variables")
    
    return Groq(api_key=api_key)

def chat_with_groq(message, model="llama-3.3-70b-versatile"):
    """
    Send a message to Groq API and get the response
    
    Args:
        message (str): The message to send to the AI
        model (str): The model to use for completion
    
    Returns:
        str: The AI's response
    """
    client = initialize_groq_client()
    completion = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "user",
                "content": message
            }
        ]
    )
    return completion.choices[0].message.content

# Example usage
if __name__ == "__main__":
    message = "What is the capital of France?"
    response = chat_with_groq(message)
    print("AI Response:", response)
