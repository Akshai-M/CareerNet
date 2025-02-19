import React, { useState } from "react";
import chat_icon from "./auth/image.png";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { name: "User", message: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await response.json();
      const botMessage = { name: "Sam", message: data.answer };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching the response:", error);
    } finally {
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (<div className="fixed bottom-10 right-10 z-10">
    <button
      onClick={toggleChatbox}
      className="p-3 bg-blue-600 text-white shadow-md rounded-full flex items-center justify-center z-20 hover:bg-blue-700"
    >
      <img src={chat_icon} alt="Chat" className="w-6 h-6 filler invert scale-150"  />
    </button>
  
    {isOpen && (
      <div className="shadow-xl rounded-lg w-80 h-96 flex flex-col fixed bottom-20 right-10 z-10 bg-white dark:bg-gray-800">
       
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 rounded-t-lg flex items-center">
          <img
            src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png"
            alt="Chat Support"
            className="mr-3 w-10 h-10"
          />
          <div>
            <h4 className="text-lg font-semibold">Chat Support</h4>
            <p className="text-sm">Hi! My name is Sam. How can I help you?</p>
          </div>
        </div>
  
        <div className="flex-grow p-4 overflow-y-auto bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.name === "Sam" ? "justify-start" : "justify-end"
              } mb-2`}
            >
              <div
                className={`${
                  msg.name === "Sam"
                    ? "bg-gray-200 text-black rounded-l-lg rounded-tr-lg"
                    : "bg-blue-600 text-white rounded-r-lg rounded-tl-lg"
                } p-3 max-w-[75%] shadow`}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>
  
        <div className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-4 rounded-b-lg flex items-center border-t border-gray-200 dark:border-gray-600">
          <input
            type="text"
            placeholder="Write a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow p-2 rounded-full bg-gray-200 text-white dark:bg-gray-600 focus:outline-none "
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    )}
  </div>
  );
};

export default Chatbot;
