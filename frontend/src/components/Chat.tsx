import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";

interface Message {
    id: number;
    sender: "user" | "ai";
    text: string;
    timestamp: string;
}

const Chat: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const chatRef = useRef<HTMLDivElement>(null);

    // Scroll to latest message
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages, open]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMsg: Message = {
            id: Date.now(),
            sender: "user",
            text: input,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        // Simulate AI response (replace with API call)
        setTimeout(() => {
            const aiMsg: Message = {
                id: Date.now() + 1,
                sender: "ai",
                text: `This is a response to: "${userMsg.text}"`,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };
            setMessages((prev) => [...prev, aiMsg]);
        }, 800);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-all"
                aria-label="Open AI Chat"
            >
                <FaRobot />
            </button>

            {/* Chat Window */}
            {open && (
                <div
                    ref={chatRef}
                    className="fixed bottom-20 right-6 w-80 md:w-96 h-96 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col overflow-hidden z-50"
                >
                    {/* Header */}
                    <div className="bg-primary text-white p-3 flex justify-between items-center">
                        <span className="font-semibold">AI Assistant</span>
                        <button
                            onClick={() => setOpen(false)}
                            className="font-bold hover:text-gray-200 transition"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[70%] px-3 py-2 rounded-xl shadow-sm break-words ${msg.sender === "user"
                                            ? "bg-primary text-white rounded-tr-none"
                                            : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-tl-none"
                                        }`}
                                >
                                    <p className="text-sm">{msg.text}</p>
                                    <span className="text-xs text-gray-400 mt-1 block text-right">
                                        {msg.timestamp}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-gray-100 dark:bg-gray-700 flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            className="flex-1 p-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-black"
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg transition"
                        >
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chat;
