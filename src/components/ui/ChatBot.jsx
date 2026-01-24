import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  Loader2,
} from 'lucide-react';

/**
 * ChatBot – Premium Floating Assistant (Improved Edition)
 * ✅ Accessibility improvements
 * ✅ Rate limiting
 * ✅ Error handling
 * ✅ Loading states
 * ✅ Keyboard navigation
 * ✅ Local storage for chat history
 * ✅ API-ready architecture
 */

const BOT_NAME = 'ByteBly Assistant';
const MAX_MESSAGES = 50; // Limit message history
const RATE_LIMIT_MAX = 10; // Max messages per session
const BOT_DELAY_MS = 700; // Typing simulation delay

const getTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const initialMessages = [
  {
    id: crypto.randomUUID(),
    role: 'bot',
    text: `Hi 👋 I am the ${BOT_NAME}. How can I help you today?`,
    time: getTime(),
  },
];

// Simple AI rules (easy to replace with real AI later)
const generateBotReply = (input) => {
  const msg = input.toLowerCase().trim();

  // Empty message
  if (!msg) {
    return 'Please type a message so I can help you!';
  }

  // Greetings
  if (/(^hi|hello|hey|greetings)/i.test(msg)) {
    return 'Hello! 👋 How can I assist you today?';
  }

  // Pricing
  if (/(price|cost|quote|budget|how much)/i.test(msg)) {
    return 'Our projects typically range from ₹5,000 to ₹50,000 depending on scope and complexity. Would you like a free consultation to discuss your specific needs?';
  }

  // Jobs/Careers
  if (/(job|career|hiring|position|work with you|join|employment)/i.test(msg)) {
    return "We're hiring! 🚀 Check out our Career page for open positions in MERN Stack development, UI/UX design, and more. We'd love to hear from talented individuals!";
  }

  // Services
  if (/(service|what do you do|capabilities|specializ)/i.test(msg)) {
    return 'We specialize in:\n• MERN Stack Development\n• Shopify E-commerce\n• Figma to Code\n• WordPress Solutions\n\nWant to know more about a specific service?';
  }

  // Contact
  if (/(contact|reach|email|phone|call|talk)/i.test(msg)) {
    return 'You can reach us at:\n📧 hr@bytebly.in\n📞 +91 7567551327\n\nOr fill out our contact form for a quick response!';
  }

  // Timeline
  if (/(how long|timeline|duration|when|deadline)/i.test(msg)) {
    return "Project timelines vary based on scope. Typically:\n• Small projects: 2-4 weeks\n• Medium projects: 1-3 months\n• Large projects: 3-6 months\n\nLet's discuss your specific project!";
  }

  // Technology stack
  if (/(tech|technology|stack|framework|tools)/i.test(msg)) {
    return 'We work with modern technologies:\n• React, Node.js, MongoDB, Express\n• Shopify Liquid & APIs\n• Figma, Framer Motion\n• WordPress, PHP\n• And more!';
  }

  // Portfolio/Work
  if (/(portfolio|work|project|example|case study|past work)/i.test(msg)) {
    return "Check out our Services section to see examples of our work! We've helped businesses increase sales by 300%+ and built platforms handling millions of users.";
  }

  // Default response
  return "That's a great question! I can connect you with our team for a detailed answer. Feel free to visit our Contact page or drop your email here.";
};

// Load chat history from localStorage
const loadChatHistory = () => {
  try {
    const stored = localStorage.getItem('chatbot_history');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Only load if less than 24 hours old
      if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
        return parsed.messages;
      }
    }
  } catch (error) {
    console.error('Failed to load chat history:', error);
  }
  return null;
};

// Save chat history to localStorage
const saveChatHistory = (messages) => {
  try {
    localStorage.setItem('chatbot_history', JSON.stringify({
      messages,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.error('Failed to save chat history:', error);
  }
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => loadChatHistory() || initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [rateLimitReached, setRateLimitReached] = useState(false);
  
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping]);

  // Save chat history when messages change
  useEffect(() => {
    if (messages.length > initialMessages.length) {
      saveChatHistory(messages);
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Handle escape key to close chat
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

  // Prevent body scroll when chat is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const sendMessage = useCallback(() => {
    if (!input.trim()) return;

    // Rate limiting
    if (messageCount >= RATE_LIMIT_MAX) {
      setRateLimitReached(true);
      setTimeout(() => setRateLimitReached(false), 3000);
      return;
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: input.trim(),
      time: getTime(),
    };

    setMessages((prev) => {
      const newMessages = [...prev, userMessage];
      // Limit message history
      return newMessages.slice(-MAX_MESSAGES);
    });
    setInput('');
    setMessageCount(prev => prev + 1);
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      try {
        const botMessage = {
          id: crypto.randomUUID(),
          role: 'bot',
          text: generateBotReply(input),
          time: getTime(),
        };

        setMessages((prev) => {
          const newMessages = [...prev, botMessage];
          return newMessages.slice(-MAX_MESSAGES);
        });
      } catch (error) {
        console.error('Failed to generate bot reply:', error);
        const errorMessage = {
          id: crypto.randomUUID(),
          role: 'bot',
          text: 'Sorry, I encountered an error. Please try again or contact us directly.',
          time: getTime(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }, BOT_DELAY_MS);
  }, [input, messageCount]);

  const clearChat = useCallback(() => {
    setMessages(initialMessages);
    setMessageCount(0);
    setRateLimitReached(false);
    localStorage.removeItem('chatbot_history');
  }, []);

  const toggleChat = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden -z-10"
              onClick={toggleChat}
              aria-hidden="true"
            />

            <motion.div
              ref={chatContainerRef}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="glass w-[360px] h-[520px] rounded-3xl overflow-hidden flex flex-col 
                         border border-white/10 shadow-2xl bg-[#0A0A0F]/95 backdrop-blur-xl"
              role="dialog"
              aria-label="Chat assistant"
              aria-modal="true"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-cyan-400 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-white/20 rounded-full" aria-hidden="true">
                    <Bot size={18} />
                  </span>
                  <div>
                    <h2 className="text-sm font-bold leading-none text-white">
                      {BOT_NAME}
                    </h2>
                    <span className="text-[10px] text-white/80 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true" />
                      Online • AI Assistant
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {messages.length > initialMessages.length && (
                    <motion.button
                      whileHover={{ scale: 1.05, color: "#fff" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearChat}
                      className="text-xs text-white/80 transition-colors
                                 px-2 py-1 rounded-lg hover:bg-white/10
                                 focus:outline-none focus:ring-2 focus:ring-white/30"
                      aria-label="Clear chat history"
                    >
                      Clear
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleChat}
                    className="p-1 rounded-lg transition-colors
                               focus:outline-none focus:ring-2 focus:ring-white/30"
                    aria-label="Close chat"
                  >
                    <X size={18} />
                  </motion.button>
                </div>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 p-5 space-y-4 overflow-y-auto bg-gradient-to-b from-[#0A0A0F] to-[#0A0A0F]/80"
                role="log"
                aria-live="polite"
                aria-atomic="false"
              >
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-primary to-cyan-400 text-white rounded-tr-none shadow-lg'
                          : 'bg-white/10 border border-white/5 text-gray-200 rounded-tl-none'
                      }`}
                      role={msg.role === 'bot' ? 'status' : undefined}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>
                      <div className="mt-1 text-[9px] opacity-50 text-right">
                        {msg.time}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Rate Limit Warning */}
              {rateLimitReached && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-4 mb-2 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-xs text-yellow-400 text-center"
                  role="alert"
                >
                  Rate limit reached. Please wait before sending more messages.
                </motion.div>
              )}

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="p-4 border-t border-white/10 bg-white/5 flex gap-2"
              >
                <label htmlFor="chat-input" className="sr-only">
                  Type your message
                </label>
                <input
                  ref={inputRef}
                  id="chat-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  disabled={isTyping || rateLimitReached}
                  maxLength={500}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-600
                             text-white disabled:opacity-50 disabled:cursor-not-allowed
                             focus:outline-none"
                  aria-label="Message input"
                />
                <motion.button
                  whileHover={!input.trim() || isTyping || rateLimitReached ? {} : { scale: 1.1 }}
                  whileTap={!input.trim() || isTyping || rateLimitReached ? {} : { scale: 0.95 }}
                  type="submit"
                  disabled={!input.trim() || isTyping || rateLimitReached}
                  className="p-3 bg-gradient-to-r from-primary to-cyan-400 rounded-xl 
                             shadow-[0_0_20px_rgba(99,102,241,0.3)]
                             transition-transform
                             disabled:opacity-50 disabled:cursor-not-allowed
                             focus:outline-none focus:ring-2 focus:ring-primary/50"
                  aria-label="Send message"
                >
                  {isTyping ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                </motion.button>
              </form>

              {/* Helper Text */}
              <div className="px-4 pb-2 text-[10px] text-gray-600 text-center">
                Press Esc to close • {messageCount}/{RATE_LIMIT_MAX} messages
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="bg-gradient-to-r from-primary to-cyan-400 p-4 rounded-full 
                   shadow-[0_0_30px_rgba(99,102,241,0.5)] text-white relative
                   hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transition-shadow
                   focus:outline-none focus:ring-4 focus:ring-primary/50"
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={open}
        aria-controls="chat-assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={26} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare size={26} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification Badge */}
        {!open && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-neonPurple rounded-full 
                       animate-pulse border-2 border-[#0A0A0F]"
            aria-hidden="true"
          />
        )}
      </motion.button>
    </div>
  );
}