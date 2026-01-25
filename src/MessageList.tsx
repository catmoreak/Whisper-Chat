import React from 'react';

interface Message {
  text: string;
  timestamp: number;
  id: string;
  username: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 message-container">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="bg-blue-900/20 backdrop-blur-lg p-4 rounded-lg max-w-xl mx-auto shadow-lg message-bubble"
        >
          <div className="text-purple-300 text-sm mb-1">{msg.username}</div>
          <div className="text-gray-100">{msg.text}</div>
          <div className="text-xs text-purple-300/60 mt-2">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;