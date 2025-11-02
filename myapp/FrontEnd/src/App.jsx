import { useState } from "react";
import { sendMessageToBackend } from "./api/client";

function App() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    const data = await sendMessageToBackend(userInput);
    setResponse(data?.response || "No response from server");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🧠 My AI App</h1>

      <textarea
        rows="4"
        cols="40"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask something..."
      />
      <br />

      <button onClick={handleSend} style={{ marginTop: "1rem" }}>
        Send
      </button>

      {response && (
        <div style={{ marginTop: "2rem" }}>
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
