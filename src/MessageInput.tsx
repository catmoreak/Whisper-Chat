import React from 'react';
import { Send} from 'lucide-react';
interface MessageInputProps {
  message: string;
  setMessage: (value: string) => void;
  sendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  message,
  setMessage,
  sendMessage,
}) => {
  return (
    <div className="bg-purple-900/20 backdrop-blur-lg px-6 py-4 shadow-lg border-t border-purple-500/20">
      <div className="max-w-4xl mx-auto flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 bg-purple-900/30 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-purple-300/40"
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg flex items-center gap-2 transition-all duration-200 font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]"
        >
            
          <Send size={18} />
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;