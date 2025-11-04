import ChatBox from "./components/ChatBox";

function App() {
  return (
    <div style={{ 
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h1 style={{ 
        textAlign: "center", 
        margin: "20px 0",
        color: "#333",
        fontSize: "2rem"
      }}>AI Chatbot</h1>
      <ChatBox />
    </div>
  );
}

export default App;