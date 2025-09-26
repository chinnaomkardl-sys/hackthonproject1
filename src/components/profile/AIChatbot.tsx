import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Bot, Send, User } from 'lucide-react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const AIChatbot: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "Hello! I'm your SecurePay AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const getBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('trust score')) {
      return 'Your Trust Score is a rating from 0-100 that reflects your payment reliability. It is affected by your transaction history, user reports, and account verification status. A higher score gives you more benefits!';
    }
    if (lowerInput.includes('refund')) {
      return 'To request a refund, go to your Transaction History, find the specific transaction, and tap on it. If it was made in the last 24 hours, you will see a "Request Refund" option.';
    }
    if (lowerInput.includes('report')) {
      return 'You can report a user from the "Report" tab in the main menu. Please provide as much detail as possible. False reports can negatively impact your own Trust Score.';
    }
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return 'Hello there! What can I do for you?';
    }
    return "I'm sorry, I'm still in training and can't answer that yet. For more complex issues, please visit our Help & Support section or contact customer service.";
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = { sender: 'bot', text: getBotResponse(input) };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-150px)]">
      <div className="flex items-center space-x-4 p-4 border-b border-gray-200 bg-white rounded-t-xl">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </button>
        <div className="flex items-center space-x-3">
          <Bot className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">AI Assistant</h1>
            <p className="text-sm text-green-600">● Online</p>
          </div>
        </div>
      </div>

      <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0"><Bot className="w-5 h-5 text-blue-600" /></div>}
            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'}`}>
              <p className="text-sm">{msg.text}</p>
            </div>
            {msg.sender === 'user' && <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0"><User className="w-5 h-5 text-gray-600" /></div>}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-end gap-2 justify-start">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0"><Bot className="w-5 h-5 text-blue-600" /></div>
            <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-white text-gray-800 border border-gray-100 rounded-bl-none">
              <div className="flex items-center space-x-1">
                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200 rounded-b-xl">
        <form onSubmit={handleSend} className="flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button type="submit" className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full disabled:bg-gray-400" disabled={isTyping || !input.trim()}>
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChatbot;
