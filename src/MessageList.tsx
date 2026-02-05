import React from 'react';

interface Message {
  text: string;
  timestamp: number;
  id: string;
  username: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'audio' | 'file';
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const renderMedia = (message: Message) => {
    if (!message.mediaUrl || !message.mediaType) return null;
  
    switch (message.mediaType) {
      case 'image':
        return (
          <div className="mt-2">
            <img
              src={message.mediaUrl}
              alt={message.text}
              className="max-w-full max-h-64 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => window.open(message.mediaUrl, '_blank')}
            />
          </div>
        );    

      case 'video':
        return (
          <div className="mt-2">
            <video
              src={message.mediaUrl}
              controls
              className="max-w-full max-h-64 rounded-lg"
            />
          </div>
        );
      case 'audio':
        return (
          <div className="mt-2">
            <audio
              src={message.mediaUrl}
              controls
              className="w-full"
            />
          </div>
        );
      case 'file':
        return (
          <div className="mt-2">
            <a
              href={message.mediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-700/50 hover:bg-blue-700/70 px-3 py-2 rounded-lg text-blue-100 text-sm transition-colors"
            >
              📎 {message.text}
            </a>
          </div>
        );
      default:
        return null;
    }
  };
 
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 message-container">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl max-w-xl shadow-xl border border-blue-400/50 message-bubble hover:shadow-2xl transition-shadow duration-200">         <div className="text-blue-100 text-sm font-semibold mb-1">{msg.username}</div>
          <div className="text-white break-words leading-relaxed">{msg.text}</div>
          {renderMedia(msg)}
          <div className="text-xs text-blue-200 mt-2 text-right">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </div>
        </div>     
      ))}
    </div>
  );
};

export default MessageList;