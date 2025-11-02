// src/api/client.js
const API_BASE_URL = "http://localhost:8000"; // 🔗 Replace with your actual Render URL

export async function sendMessageToBackend(message) {
  try {
    const response = await fetch(`${API_BASE_URL}/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ API Error:", error);
    return { error: error.message };
  }
}
