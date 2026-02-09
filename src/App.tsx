import { useState, useEffect } from 'react';
import { ref, onValue, push, set, serverTimestamp } from 'firebase/database';
import { db } from './firebase';

import toast, { Toaster } from 'react-hot-toast';
import type { Message } from './lib/types';
import { generateRoomCode } from './lib/utils';
import { useUsername } from './hooks/useUsername';
import LoadingScreen from './components/LoadingScreen';
import RoomSetup from './Roomsetup';
import ChatHeader from './components/ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import InfoButton from './infoButton';
import { utapi } from './lib/uploadthing';

function App() {
  const [roomCode, setRoomCode] = useState<string>('');
  const [inputRoom, setInputRoom] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const username = useUsername();
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const [loadingText, setLoadingText] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    if (!roomCode) return;
 const userRef = ref(db, `rooms/${roomCode}/users/${username}`);
    const presenceInterval = setInterval(() => {
      set(userRef, { lastSeen: serverTimestamp() });
    }, 5000);

    const usersRef = ref(db, `rooms/${roomCode}/users`);
    const unsubscribeUsers = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const now = Date.now();
        const activeUsers = Object.values(data).filter((user: any) => 
          now - user.lastSeen < 15000
        ).length;
        setOnlineUsers(activeUsers);
      } else {
        setOnlineUsers(1);
      }
    });

    return () => {
      clearInterval(presenceInterval);
      unsubscribeUsers();
      set(userRef, null);
    };
  }, [roomCode, username]);

  useEffect(() => {
    if (!loading) return;

    const texts = [
      'INITIALIZING SECURE CONNECTION',
      'ESTABLISHING ENCRYPTED CHANNEL',
      'VERIFYING ROOM CREDENTIALS',
      'SYNCING QUANTUM ENCRYPTION',
      'ACCESSING SECURE SERVER'
    ];
    let index = 0;

    const typeWriter = () => {
      if (index < texts.length) {
        setLoadingText(texts[index]);
        index++;
      }
    };

    const interval = setInterval(typeWriter, 600);
    typeWriter();

    return () => clearInterval(interval);
  }, [loading]);

  const createRoom = async () => {
    setLoading(true);
    const newRoomCode = generateRoomCode();
    setRoomCode(newRoomCode);
    setTimeout(() => setLoading(false), 3000);
  };

  const joinRoom = async () => {
    if (inputRoom.length !== 5 || !/^\d+$/.test(inputRoom)) {
      toast.error('Please enter a valid 5-digit room code');
      return;
    }
    setLoading(true);
    setRoomCode(inputRoom);
    setTimeout(() => setLoading(false), 3000);
  };

  const shareRoom = () => {
    const shareMessage = `🔒 Join my secure chat room on Whisper Chat  \n 🎯 Room Code: ${roomCode}\n🌐 Active Users: ${onlineUsers}\n\nJoin now for anonymous conversations.`;
    navigator.clipboard.writeText(shareMessage);
    toast.success('Invitation message copied to clipboard!', {
      icon: '🔗',
      duration: 5000,
    });
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    const messagesRef = ref(db, `rooms/${roomCode}/messages`);
    const newMessageRef = push(messagesRef);
    await set(newMessageRef, {
      text: message,
      timestamp: Date.now(),
      id: newMessageRef.key,
      username
    });
    setMessage('');
  };

  const handleFileSelect = async (file: File) => {
    setUploading(true);
    try {
      const response = await utapi.uploadFiles([file]);
      if (response.length > 0) {
        const fileUrl = response[0].data?.url;
        if (fileUrl) {
          const messagesRef = ref(db, `rooms/${roomCode}/messages`);
          const newMessageRef = push(messagesRef);
          await set(newMessageRef, {
            text: `Shared an image: ${file.name}`,
            mediaUrl: fileUrl,
            mediaType: 'image',
            timestamp: Date.now(),
            id: newMessageRef.key,
            username
          });
          toast.success('Image uploaded successfully!');
        }
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (!roomCode) return;

    const messagesRef = ref(db, `rooms/${roomCode}/messages`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.values(data) as Message[];
        setMessages(messageList.sort((a, b) => a.timestamp - b.timestamp));
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [roomCode]);

  const showInfo = () => {
    toast('Security Reminder:Please avoid sharing sensitive information such as phone numbers, physical addresses,credit/debit card details,etc in the chat.', {
      icon: '🔒',
      duration: 3000,
    });
  };

  if (loading) {
    return <LoadingScreen roomCode={roomCode} loadingText={loadingText} />;
  }

  if (!roomCode) {
    return (
      <RoomSetup
        inputRoom={inputRoom}
        setInputRoom={setInputRoom}
        createRoom={createRoom}
        joinRoom={joinRoom}
      />
    );
  }

  return (
    <div className="min-h-screen bg-blue-950 flex flex-col">
      <ChatHeader
        roomCode={roomCode}
        onlineUsers={onlineUsers}
        username={username}
        shareRoom={shareRoom}
      />
      <MessageList messages={messages} />
      <MessageInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        onFileSelect={handleFileSelect}
        uploading={uploading}
      />
      <InfoButton showInfo={showInfo} />
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e3a8a',
            color: '#F3F4F6',
            borderRadius: '8px',
            border: '1px solid rgba(59, 130, 246, 0.2)',
          },
        }}
      />
    </div>
  );
}

export default App;
