import { useState, useEffect, useRef } from "react";

export default function Chat() {

    const [chatHistory, setChatHistory] = useState([
        { sender: "system", text: "سلام! با من چت کن" },
    ]);
    const [currentMessage, setCurrentMessage] = useState("");
    const messagesEndRef = useRef();

    const handleSend = () => {
        const message = currentMessage.trim();
        if (!message) return;

        setChatHistory((prev) => [
        ...prev,
        { sender: "user", text: message },
        { sender: "system", text: "پیام شما دریافت شد" },
        ]);
        setCurrentMessage("");
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    return (
        <div className="max-w-md mx-auto mt-10 bg-gray-800 text-white rounded-lg shadow-lg p-4 flex flex-col h-[500px]">
            {/* نمایش پیام‌ها */}
            <div className="flex-1 overflow-y-auto mb-4 flex flex-col gap-2">
                {chatHistory.map((msg, idx) => (
                <div
                    key={idx}
                    className={`p-2 rounded max-w-[75%] ${
                    msg.sender === "user"
                        ? "bg-blue-600 self-start text-right"
                        : "bg-gray-700 self-end text-right"
                    }`}>
                    {msg.text}
                </div>
                ))}
                <div ref={messagesEndRef}></div>
            </div>

            {/* ورودی پیام */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="پیام خود را بنویسید..."
                    className="flex-1 p-2 rounded text-black"
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                    ارسال
                </button>
            </div>
        </div>
    );
}
