import React, { useState, useEffect, useRef } from 'react';


interface Message {
  type: 'message' | 'join' | 'leave' | 'announce';
  username: string;
  content?: string;
  timestamp: number;
}
const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
 
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
    if (!username.trim()) {
      alert('Please enter a username');
      return;
    }

    const ws = new WebSocket('ws://localhost:3001');
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);

      
      const joinMessage: Message = {
        type: 'join',
        username: username.trim(),
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

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="header-decoration">
          <div className="hall-title">
         
            <h1>Whisper Chat</h1>
          </div>
        </div>
        {!isConnected ? (
          <div className="connection-form">
            <input
              type="text"
              placeholder="Enter your agent name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
             
            />
            <button onClick={connect} className="join-button">Join Chat</button>
          </div>
        ) : (
          <div className="connection-status">
            <span>Welcome, {username}!</span>
            <button onClick={disconnect} className="leave-button">Leave Chat</button>
          </div>
        )}
      </div>

      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type === 'message' ? (msg.username === username ? 'own' : 'other') : msg.type}`}>
            <div className="message-bubble">
              {msg.type === 'message' && (
                <>
                  <div className="message-header">
                    <span className="username">{msg.username}</span>
                    <span className="timestamp">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="content">{msg.content}</div>
                </>
              )}
              {msg.type === 'join' && (
                <div className="content">
                  <span className="username">{msg.username}</span> joined the Chat!
                </div>
              )}
              {msg.type === 'leave' && (
                <div className="content">
                  <span className="username">{msg.username}</span> left the Chat!
                </div>
              )}
              {msg.type === 'announce' && (
                <div className="content announce">
                  📢 <strong>Announcement:</strong> {msg.content}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {isConnected && (
        <div className="input-container">
          <input
            type="text"
            placeholder="Send a message to your team..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={sendMessage} className="send-button">Send</button>
        </div>
      )}

    </div>
  );
};

export default Chat;















