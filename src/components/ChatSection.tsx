import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, History, Loader2, X } from "lucide-react";
import { useLlmResponse } from '@/hooks/useLlmResponse';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface ChatMessage {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
}

interface ChatSession {
  id: string;
  title: string;
  date: string;
  messages: ChatMessage[];
}

interface ChatWindowProps {
  onClose: () => void;
  isMinimized: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose, isMinimized }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [currentSessionId, setCurrentSessionId] = useState<string>("");
    const [activeQuery, setActiveQuery] = useState("");
  
    const { response, isLoading } = useLlmResponse(activeQuery);
  
    useEffect(() => {
      try {
        const savedHistory = localStorage.getItem("chatHistory");
        if (savedHistory) {
          const parsedHistory = JSON.parse(savedHistory);
          setChatHistory(parsedHistory);
  
          const lastSession = parsedHistory[parsedHistory.length - 1];
          if (lastSession) {
            setCurrentSessionId(lastSession.id);
            setMessages(lastSession.messages);
          } else {
            createNewSession();
          }
        } else {
          createNewSession();
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
        createNewSession();
      }
    }, []);
  
    useEffect(() => {
      if (response && activeQuery) {
        const newMessage: ChatMessage = {
          id: Date.now(),
          text: response,
          isBot: true,
          timestamp: new Date().toISOString(),
        };
  
        setMessages((prev) => [...prev, newMessage]);
        setChatHistory((prev) => {
          const updated = prev.map((session) =>
            session.id === currentSessionId
              ? { ...session, messages: [...session.messages, newMessage] }
              : session
          );
          localStorage.setItem("chatHistory", JSON.stringify(updated));
          return updated;
        });
  
        setActiveQuery(""); // Reset only after response
      }
    }, [response]);
  
    const createNewSession = () => {
      const timestamp = Date.now();
      const newSession: ChatSession = {
        id: timestamp.toString(),
        title: `Chat Session ${new Date(timestamp).toLocaleDateString()}`,
        date: new Date(timestamp).toISOString(),
        messages: [
          {
            id: timestamp,
            text: "Hello! How can I help you with your code today?",
            isBot: true,
            timestamp: new Date(timestamp).toISOString(),
          },
        ],
      };
  
      setCurrentSessionId(newSession.id);
      setMessages(newSession.messages);
      setChatHistory((prev) => {
        const updated = [...prev, newSession];
        localStorage.setItem("chatHistory", JSON.stringify(updated));
        return updated;
      });
    };
  
    const clearHistory = () => {
      localStorage.removeItem("chatHistory");
      setChatHistory([]);
      createNewSession();
    };
  
    const addMessageToSession = (message: ChatMessage) => {
      if (!currentSessionId) return;
  
      setMessages((prev) => [...prev, message]);
      setChatHistory((prev) => {
        const updated = prev.map((session) =>
          session.id === currentSessionId
            ? { ...session, messages: [...session.messages, message] }
            : session
        );
        localStorage.setItem("chatHistory", JSON.stringify(updated));
        return updated;
      });
    };
  
    const handleSendMessage = (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputMessage.trim() || !currentSessionId) return;
  
      const userMessage: ChatMessage = {
        id: Date.now(),
        text: inputMessage,
        isBot: false,
        timestamp: new Date().toISOString(),
      };
  
      addMessageToSession(userMessage);
      setInputMessage("");
  
      const prompt = `Respond as a coding assistant and provide clear and detailed assistance based on the following input: ${inputMessage}`;
      setActiveQuery(prompt); // Set query only after sending the user message
    };
  
    const loadSession = (sessionId: string) => {
      const session = chatHistory.find((s) => s.id === sessionId);
      if (session) {
        setCurrentSessionId(sessionId);
        setMessages(session.messages);
      }
    };
  
    return (
      <div
        className={`fixed right-4 bottom-4 transition-all duration-300 ease-in-out ${
          isMinimized ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="bg-background rounded-lg shadow-xl border w-auto h-auto overflow-auto">
          <div className="flex items-center justify-between p-2 border-b">
            <h2 className="text-sm font-medium">Chat Assistant</h2>
            <div className="flex gap-2">
              
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 bg-gray-200 dark:bg-gray-700"
                onClick={onClose}
                aria-label="Close chat"
              >
                <X className="h-4 w-4 " />
              </Button>
            </div>
          </div>
  
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4 " />
                History
              </TabsTrigger>
            </TabsList>
  
            <TabsContent value="chat">
            <Card className="border-2 dark:border-gray-600">
              <ScrollArea className="h-96 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isBot ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${
                          message.isBot
                            ? "bg-gray-200 dark:bg-gray-700"
                            : "bg-blue-500 text-white dark:bg-blue-600"
                        }`}
                      ><ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                          code: ({
                              node,
                              inline,
                              className,
                              children,
                              ...props
                          }: {
                              node?: any;
                              inline?: boolean;
                              className?: string;
                              children?: React.ReactNode;
                          }) => {
                              const languageMatch = /language-(\w+)/.exec(className || "");
                              const codeContent = String(children).replace(/\n$/, "");
                  
                              return !inline && languageMatch ? (
                                  <SyntaxHighlighter
                                      style={tomorrow}
                                      language={languageMatch[1]}
                                      PreTag="div"
                                      {...props}
                                  >
                                      {codeContent}
                                  </SyntaxHighlighter>
                              ) : (
                                  <code className={className} {...props}>
                                      {children}
                                  </code>
                              );
                          },
                      }}
                  >{message.text}</ReactMarkdown>
                        
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="rounded-lg px-4 py-2 bg-gray-200 dark:bg-gray-700">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-600">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
                  </Button>
                </div>
              </form>
            </Card>
          </TabsContent>
  
            <TabsContent value="history">
              <Card className="border-2 dark:border-gray-600">
                <ScrollArea className="h-96 p-4">
                  <div className="space-y-2">
                    <Button onClick={createNewSession} className="w-full mb-4">
                      New Chat
                    </Button>
                    <Button onClick={clearHistory} className="w-full mb-4">
                      Clear History
                    </Button>
                    {chatHistory.map((session) => (
                      <div
                        key={session.id}
                        onClick={() => loadSession(session.id)}
                        className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                          session.id === currentSessionId
                            ? "bg-gray-100 dark:bg-gray-700"
                            : ""
                        }`}
                      >
                        <div>
                          <h4 className="font-medium">{session.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(session.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  };
  
      

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsMinimized(true);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMinimized(true);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (isOpen) {
      setIsMinimized(prev => !prev);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  return (
    <div ref={chatRef}>
      <Button
        onClick={handleToggle}
        className={`
          fixed right-4 bottom-4
          rounded-full h-12 w-12 
          flex items-center justify-center 
          shadow-lg
          transition-transform duration-300
          hover:scale-105 bg-white text-black dark:bg-gray-700 dark:text-white
          ${isOpen && !isMinimized ? 'scale-0' : 'scale-100'}
        `}
        aria-label="Open chat"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="sr-only">Chat with AI Assistant</span>
      </Button>

      {isOpen && (
        <ChatWindow 
          onClose={() => setIsMinimized(true)}
          isMinimized={isMinimized}
        />
      )}
    </div>
  );
};

export default FloatingChatButton;