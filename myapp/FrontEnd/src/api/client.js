// src/api/client.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ragagent-6005.onrender.com';
// Debug all environment variables
console.log('All env variables:', import.meta.env);
console.log('API URL:', API_BASE_URL); // Debug log

export async function sendMessageToBackend(message) {
  try {
    if (!API_BASE_URL) {
      throw new Error('API_BASE_URL is not defined. Check environment variables.');
    }
    const url = import.meta.env.DEV ? '/test' : `${API_BASE_URL}/test`;
    console.log('Sending request to:', url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server response:', errorText);
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Server response:', data);
    return data;
  } catch (error) {
    console.error("❌ API Error:", error);
    return { error: error.message };
  }
}
