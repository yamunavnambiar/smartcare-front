import React, { useState, useEffect, useRef } from "react";
import chatbotData from "./data/chatbotData";

const ChatbotPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [messages, setMessages] = useState([]);
  const [showTyping, setShowTyping] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true); // NEW
  const chatEndRef = useRef(null);
  
  const [conversationLog, setConversationLog] = useState([]);

  const [waitingForAnswer, setWaitingForAnswer] = useState(false);


  const welcomeShownRef = useRef(false);


  useEffect(() => {
    const timeout = setTimeout(() => {
      if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // slight delay helps after DOM updates
    return () => clearTimeout(timeout);
  }, [messages, showTyping]);



  useEffect(() => {
    if (!welcomeShownRef.current) {
      welcomeShownRef.current = true;
      showBotMessage(
        "Hi there! I’m here to listen and support you. Take your time answering these questions. There’s no judgment—just a safe space to understand how you're really feeling. Let’s take this one step at a time. 💙"
      );
    }
  }, []);



const sendToBackend = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/replicat/generate-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ conversation: conversationLog })
    });

    const data = await response.json();
    if (data.summary) {
      setMessages(prev => [
        ...prev,
        { type: "note", text: "Please note: This summary is for informational and supportive purposes only. It is not a substitute for professional mental health advice or diagnosis." },
       
        { type: "report", text: data.summary }
      ]);
    } else {
      setMessages(prev => [
        ...prev,
        { type: "bot", text: "Sorry, I couldn’t generate a report right now." }
      ]);
    }
  } catch (error) {
    setMessages(prev => [
      ...prev,
      { type: "bot", text: "There was an error generating the report." }
    ]);
    console.error("Error:", error);
  }
};



  const showBotMessage = (text, delay = 1000) => {
    setShowTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", text }]);
      setShowTyping(false);
    }, delay);
  };

  const showVideo = (url, delay = 1000) => {
    setShowTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "video", url }]);
      setShowTyping(false);
    }, delay);
  };

  const handleStart = () => {
    setMessages((prev) => [...prev, { type: "user", text: "Let’s start" }]);
    setShowStartButton(false);
    setTimeout(() => {
      showBotMessage(chatbotData[0].question);
    }, 1000);
  };

  const handleOptionClick = (option) => {
    const selected = chatbotData[currentQuestion];
    const comfort = selected.comfort?.[option];

    setMessages((prev) => [...prev, { type: "user", text: option }]);
    setWaitingForAnswer(true); // prevent showing next options early

    let delay = 1000;

      if (selected.comfortMessage) {
        delay += 1000;
        showBotMessage(selected.comfortMessage, delay);
      }

      if (comfort) {
        if (comfort.message) {
          delay += 1000;
          showBotMessage(comfort.message, delay);
        }
        if (comfort.video) {
          delay += 1000;
          showVideo(comfort.video, delay);
        }
      }

      setConversationLog(prev => [
        ...prev,
        {
          question: chatbotData[currentQuestion].question,
          answer: option
        }
      ]);

      const nextQuestionIndex = currentQuestion + 1;

      if (nextQuestionIndex < chatbotData.length) {
        delay += 1000;
        setTimeout(() => {
          showBotMessage(chatbotData[nextQuestionIndex].question);
          setCurrentQuestion(nextQuestionIndex);
          setWaitingForAnswer(false); // allow next options to show
        }, delay + 500);
      } else {
        setCurrentQuestion(nextQuestionIndex);
        setTimeout(() => {
          sendToBackend();
        }, delay + 500);
      }
    };



  const restartChat = () => {
  setMessages([]);
  setCurrentQuestion(0);
  setShowStartButton(true);
  welcomeShownRef.current = false; // reset on restart
};


  


  const messageStyles = {
    bot: {
      alignSelf: "flex-start",
      background: "#E6E6FA",
      color: "#333",
      padding: "12px 16px",
      borderRadius: "16px",
      margin: "6px 0",
      maxWidth: "80%",
      animation: "fadeIn 0.5s ease-in"
    },
    user: {
      alignSelf: "flex-end",
      background: "#D8BFD8",
      color: "#000",
      padding: "12px 16px",
      borderRadius: "16px",
      margin: "6px 0",
      maxWidth: "80%",
      animation: "fadeIn 0.5s ease-in"
    },
    note: {
      alignSelf: "center",
      background: "#FFF8DC",
      color: "#555",
      padding: "10px 14px",
      borderRadius: "12px",
      fontSize: "0.9rem",
      margin: "8px 0",
      borderLeft: "4px solid #FFD700",
      maxWidth: "90%",
      fontStyle: "italic"
    },
    report: {
      alignSelf: "center",
      background: "#F0F8FF",
      color: "#003366",
      padding: "16px 20px",
      borderRadius: "16px",
      margin: "12px 0",
      border: "2px solid #8A2BE2",
      maxWidth: "90%",
      fontWeight: "500",
      whiteSpace: "pre-wrap",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }

  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        backgroundColor: "#fef6ff",
        padding: "24px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        
        {messages.map((msg, i) => {
          if (msg.type === "video") {
            return (
              <div key={i} style={messageStyles.bot}>
                <iframe
                  width="100%"
                  height="250"
                  src={msg.url}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Comfort Video"
                  style={{ borderRadius: "12px", marginTop: "8px" }}
                />
              </div>
            );
          }

          return (
            <div key={i} style={messageStyles[msg.type] || messageStyles.bot}>
              {msg.text}
            </div>
          );
        })}


        {showTyping && (
          <div style={{ ...messageStyles.bot, fontStyle: "italic" }}>
            Typing...
          </div>
        )}

        {showStartButton && !showTyping && (
          <div style={{ marginTop: "12px" }}>
            <button
              onClick={handleStart}
              style={{
                background: "#DDA0DD",
                color: "#fff",
                padding: "10px 16px",
                border: "none",
                borderRadius: "12px",
                margin: "6px",
                cursor: "pointer",
                transition: "0.3s",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
              }}
            >
              Let’s start
            </button>
          </div>
        )}

        {!showStartButton &&
        currentQuestion < chatbotData.length &&
        !showTyping &&
        !waitingForAnswer && (
          <div style={{ marginTop: "12px" }}>
            {chatbotData[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                style={{
                  background: "#DDA0DD",
                  color: "#fff",
                  padding: "10px 16px",
                  border: "none",
                  borderRadius: "12px",
                  margin: "6px",
                  cursor: "pointer",
                  transition: "0.3s",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}



        {currentQuestion === chatbotData.length && (
          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <h3>💜 Thank you for sharing. I'm proud of you.</h3>
            <button
              onClick={restartChat}
              style={{
                marginTop: "12px",
                backgroundColor: "#BA55D3",
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                borderRadius: "14px",
                cursor: "pointer"
              }}
            >
              Restart Chat
            </button>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default ChatbotPage;
