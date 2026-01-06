import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    PiChatCircleDotsDuotone,
    PiXDuotone,
    PiPaperPlaneRightDuotone,
    PiRobotDuotone,
    PiUserDuotone,
} from 'react-icons/pi'

interface Message {
    id: string
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
}

const quickReplies = [
    'Get a quote',
    'Emergency service',
    'Track my order',
    'Talk to a human',
]

const botResponses: Record<string, string> = {
    'get a quote': 'I can help you get a quote! Please visit our Services page to browse our offerings and add them to your cart. Then, proceed to request a quote with your preferred inspection date.',
    'emergency service': 'For emergency services, please call our 24/7 hotline at +1 (555) 987-6543 or contact us via WhatsApp for immediate assistance.',
    'track my order': 'To track your service order, please log in to your account and visit the "My Orders" section, or provide your order number and I can help you check the status.',
    'talk to a human': 'I\'ll connect you with one of our customer service representatives. Please hold on while I transfer you, or you can reach us directly at support@repairpro.com.',
    default: 'Thank you for your message! I\'m here to help with questions about our services, quotes, and orders. You can also reach our team directly through the Contact page.',
}

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! 👋 Welcome to RepairPro. How can I help you today?',
            sender: 'bot',
            timestamp: new Date(),
        },
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const getBotResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase()
        
        for (const [key, response] of Object.entries(botResponses)) {
            if (key !== 'default' && lowerMessage.includes(key)) {
                return response
            }
        }

        if (lowerMessage.includes('service') || lowerMessage.includes('repair')) {
            return 'We offer a wide range of services including electrical fencing, surveillance cameras, painting, AC repair, and more. Would you like me to guide you to our Services page?'
        }

        if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            return 'Our pricing varies based on the specific service and scope of work. You can browse our services and add them to your cart to get an estimated quote.'
        }

        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return 'Hello! How can I assist you today? Feel free to ask about our services, request a quote, or inquire about ongoing work.'
        }

        return botResponses.default
    }

    const handleSendMessage = async (text?: string) => {
        const messageText = text || inputValue.trim()
        if (!messageText) return

        const userMessage: Message = {
            id: Date.now().toString(),
            text: messageText,
            sender: 'user',
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInputValue('')
        setIsTyping(true)

        // Simulate bot thinking
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: getBotResponse(messageText),
            sender: 'bot',
            timestamp: new Date(),
        }

        setIsTyping(false)
        setMessages((prev) => [...prev, botMessage])
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <>
            {/* Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center z-50"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                    >
                        <PiChatCircleDotsDuotone className="w-7 h-7" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    >
                        {/* Header */}
                        <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <PiRobotDuotone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">RepairPro Assistant</h3>
                                    <p className="text-sm text-blue-200">Online • Ready to help</p>
                                </div>
                            </div>
                            <button
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <PiXDuotone className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div
                                        className={`flex items-start gap-2 max-w-[80%] ${
                                            message.sender === 'user' ? 'flex-row-reverse' : ''
                                        }`}
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                message.sender === 'user'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                            }`}
                                        >
                                            {message.sender === 'user' ? (
                                                <PiUserDuotone className="w-4 h-4" />
                                            ) : (
                                                <PiRobotDuotone className="w-4 h-4" />
                                            )}
                                        </div>
                                        <div
                                            className={`px-4 py-2 rounded-2xl ${
                                                message.sender === 'user'
                                                    ? 'bg-blue-600 text-white rounded-br-sm'
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-sm'
                                            }`}
                                        >
                                            {message.text}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    className="flex justify-start"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                            <PiRobotDuotone className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                        </div>
                                        <div className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-sm">
                                            <div className="flex gap-1">
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies */}
                        <div className="px-4 pb-2">
                            <div className="flex flex-wrap gap-2">
                                {quickReplies.map((reply) => (
                                    <button
                                        key={reply}
                                        className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                        onClick={() => handleSendMessage(reply)}
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-full text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Type a message..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                />
                                <button
                                    disabled={!inputValue.trim()}
                                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    onClick={() => handleSendMessage()}
                                >
                                    <PiPaperPlaneRightDuotone className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Chatbot
