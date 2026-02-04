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
          className="bg-blue-500 p-4 rounded-xl max-w-xl shadow-xl border border-gray-200 message-bubble self-start"
        >
          <div className="text-gray-600 text-sm font-semibold mb-2">{msg.username}</div>
          <div className="text-black break-words leading-relaxed">{msg.text}</div>
          <div className="text-xs text-white-500 mt-3 text-right">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </div>
        </div>     
      ))}
    </div>
  );
};

export default MessageList;