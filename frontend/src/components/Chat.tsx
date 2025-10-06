import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: `This is a response to: "${userMsg.text}"`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 800);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 0.5 
        }}
        whileHover={{ scale: 1.05, rotate: 3, transition: { duration: 0.08, ease: "easeOut" } }}
        whileTap={{ scale: 0.95, transition: { duration: 0.05, ease: "easeOut" } }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-all hover:shadow-xl"
      >
        <motion.div
          animate={{ rotate: open ? 360 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaRobot />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            className="fixed bottom-20 right-6 w-80 md:w-96 h-96 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200 dark:border-gray-700"
          >
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-primary text-white p-3 flex justify-between items-center"
            >
              <span className="font-semibold">AI Assistant</span>
              <motion.button
                whileHover={{ scale: 1.05, rotate: 45, transition: { duration: 0.08, ease: "easeOut" } }}
                whileTap={{ scale: 0.95, transition: { duration: 0.05, ease: "easeOut" } }}
                onClick={() => setOpen(false)}
                className="font-bold hover:text-gray-200 transition-colors duration-200"
              >
                ✕
              </motion.button>
            </motion.div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 300,
                      damping: 25
                    }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.01, transition: { duration: 0.08, ease: "easeOut" } }}
                      className={`max-w-[70%] px-3 py-2 rounded-xl shadow-sm break-words ${
                        msg.sender === "user"
                          ? "bg-primary text-white rounded-tr-none"
                          : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <span className="text-xs text-gray-400 mt-1 block text-right">
                        {msg.timestamp}
                      </span>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-3 bg-gray-100 dark:bg-gray-700 flex items-center space-x-2"
            >
              <motion.input
                whileFocus={{ scale: 1.01, transition: { duration: 0.08, ease: "easeOut" } }}
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 p-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-black transition-all duration-200"
              />
              <motion.button
                whileHover={{ scale: 1.05, rotate: 5, transition: { duration: 0.08, ease: "easeOut" } }}
                whileTap={{ scale: 0.95, transition: { duration: 0.05, ease: "easeOut" } }}
                onClick={sendMessage}
                className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg transition-colors duration-200"
              >
                <motion.div
                  animate={{ x: input.trim() ? [0, 5, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaPaperPlane />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chat;