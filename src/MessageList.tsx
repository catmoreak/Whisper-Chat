import React, { useState, useEffect, useRef } from 'react';
import { useUsername } from './hooks/useUsername';
import { Share2, Users, ShieldCheck } from 'lucide-react';

interface Message {
  type: 'message' | 'join' | 'leave' | 'announce';
  username: string;
  content?: string;
  timestamp: number;
  id?: string;
}

interface MessageListProps {
  messages?: Message[];
  roomCode?: string;
  onlineUsers?: number;
  shareRoom?: () => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages: propMessages,
  roomCode = "00000",
  onlineUsers = 1,
  shareRoom
}) => {
  const [messages, setMessages] = useState<Message[]>(propMessages || []);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const username = useUsername();

  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const connect = () => {
    const ws = new WebSocket('ws://localhost:3001');
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);

      const joinMessage: Message = {
        type: 'join',
        username: username,
        timestamp: Date.now()
      };
      ws.send(JSON.stringify(joinMessage));
    };

    ws.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  };

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  const sendMessage = () => {
    if (!inputMessage.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      return;
    }

    const message: Message = {
      type: 'message',
      username,
      content: inputMessage.trim(),
      timestamp: Date.now()
    };

    wsRef.current.send(JSON.stringify(message));
    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const defaultShareRoom = () => {
    navigator.clipboard.writeText(roomCode);
    alert(`Room code ${roomCode} copied to clipboard!`);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900">
      
      <div className="bg-purple-900/20 backdrop-blur-lg px-6 py-4 flex justify-between items-center shadow-lg border-b border-purple-500/20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <h1 className="text-lg font-semibold text-white">Room: {roomCode}</h1>
          </div>
          <div className="flex items-center gap-2 text-purple-300">
            <Users size={16} />
            <span>{onlineUsers} online</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-purple-300 text-sm">
            You are: {username}
          </div>
          <button
            onClick={shareRoom || defaultShareRoom}
            className="bg-purple-900/40 hover:bg-purple-800/40 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10"
          >
            <Share2 size={18} />
            Share Room
          </button>
        </div>
      </div>

      
      {!isConnected ? (
        <div className="p-4 bg-purple-900/10 border-b border-purple-500/20">
          <div className="flex items-center gap-4">
            <span className="text-purple-300">Not connected</span>
            <button
              onClick={connect}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-all duration-200"
            >
              Join Chat
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-green-900/10 border-b border-green-500/20">
          <div className="flex items-center justify-between">
            <span className="text-green-300">Connected as {username}</span>
            <button
              onClick={disconnect}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-all duration-200"
            >
              Leave Chat
            </button>
          </div>
        </div>
      )}
 <div className="flex-1 overflow-y-auto p-6 space-y-4 message-container">
        {messages.map((msg, index) => (
          <div
            key={msg.id || index}
            className={`message ${msg.type === 'message' ? (msg.username === username ? 'own' : 'other') : msg.type}`}
          >
            <div className="message-bubble bg-purple-900/20 backdrop-blur-lg p-4 rounded-lg max-w-xl mx-auto shadow-lg">
              {msg.type === 'message' && (
                <>
                  <div className="message-header">
                    <span className="username text-purple-300 text-sm mb-1">{msg.username}</span>
                    <span className="timestamp text-xs text-purple-300/60 mt-2">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="content text-gray-100">{msg.content}</div>
                </>
              )}
              {msg.type === 'join' && (
                <div className="content text-green-300 text-center">
                  <span className="username font-semibold">{msg.username}</span> joined the chat!
                </div>
              )}
              {msg.type === 'leave' && (
                <div className="content text-red-300 text-center">
                  <span className="username font-semibold">{msg.username}</span> left the chat!
                </div>
              )}
              {msg.type === 'announce' && (
                <div className="content announce text-yellow-300 text-center">
                  📢 <strong>Announcement:</strong> {msg.content}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {isConnected && (
        <div className="p-4 bg-purple-900/10 border-t border-purple-500/20">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Send a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-purple-900/30 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-purple-300/40"
            />
            <button
              onClick={sendMessage}
              className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition-all duration-200 font-medium"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;