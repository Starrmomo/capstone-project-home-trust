// frontend/src/components/Chatbot.jsx
import { useState, useRef, useEffect } from "react";
import styles from "./Chatbot.module.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "👋 Hi! I'm the Home Trust Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: updatedMessages.slice(1),
        }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "⚠️ Sorry, I couldn't connect. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className={styles.wrapper}>
      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatBox}>

          {/* Header */}
          <div className={styles.header}>
            <span>🏠 Home Trust Assistant</span>
            <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.role === "user" ? styles.bubbleUser : styles.bubbleBot
                }
              >
                {msg.text}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className={styles.bubbleTyping}>Typing...</div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage} className={styles.sendBtn}>
              ➤
            </button>
          </div>

        </div>
      )}

      {/* Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className={styles.toggleBtn}>
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
};

export default Chatbot;