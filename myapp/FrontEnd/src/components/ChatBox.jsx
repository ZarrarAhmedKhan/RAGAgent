import { useState, useRef, useEffect } from "react";
import { sendMessageToBackend } from "../api/client";

function ChatBox() {
  const [messages, setMessages] = useState([]); // store chat history
  const [input, setInput] = useState("");       // store user's text
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null); // reference for auto-scrolling

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // add user message to chat
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
        const data = await sendMessageToBackend(input);

      // add bot message
      const botMessage = { sender: "bot", text: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container" style={styles.container}>
      <div className="chat-box" style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              width: "100%",
              marginBottom: "8px"
            }}
          >
            <div
              style={{
                ...styles.message,
                backgroundColor: msg.sender === "user" ? "#DCF8C6" : "#E5E5EA",
                marginLeft: msg.sender === "user" ? "auto" : "0",
                marginRight: msg.sender === "user" ? "0" : "auto",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ ...styles.loading, textAlign: "left", width: "100%", marginLeft: "10px" }}>
            Bot is typing...
          </div>
        )}
        <div ref={messagesEndRef} /> {/* Invisible element for scrolling */}
      </div>

      <div style={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    width: "800px",
    margin: "0 auto",
    position: "relative",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    backgroundColor: "#f8f8f8",
    borderRadius: "15px",
    marginBottom: "10px",
  },
  message: {
    padding: "12px 18px",
    borderRadius: "15px",
    width: "fit-content",
    maxWidth: "70%",
    backgroundColor: "#E5E5EA",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    wordBreak: "break-word",
  },
  inputArea: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#0078FF",
    color: "white",
    border: "none",
    borderRadius: "8px",
  },
  loading: {
    fontStyle: "italic",
    color: "#555",
  },
};
