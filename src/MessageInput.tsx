import React, { useRef } from 'react';
import { Send, Image } from 'lucide-react';
interface MessageInputProps {
  message: string;
  setMessage: (value: string) => void;
  sendMessage: () => void;
  onFileSelect?: (file: File) => void;
  uploading?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  message,
  setMessage,
  sendMessage,
  onFileSelect,
  uploading = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-blue-900/20 backdrop-blur-lg px-6 py-4 shadow-lg border-t border-blue-500/20">
      <div className="max-w-4xl mx-auto flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 bg-blue-900/30 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-blue-300/40"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/png,image/jpeg,image/heic"
          className="hidden"
        />
        <button
          onClick={triggerFileSelect}
          disabled={uploading}
          className={`py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-200 font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] ${
            uploading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
          title="Attach image"
        >
          <Image size={18} />
          {uploading && 'Uploading...'}
        </button>
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg flex items-center gap-2 transition-all duration-200 font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
        >
            
          <Send size={18} />
          Send
        </button>
      </div>
    </div>
  );
}; 
export default MessageInput;