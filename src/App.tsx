import React, { useState } from 'react';
import RoomSetup from './Roomsetup';
import { generateRoomCode } from './lib/utils';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [inputRoom, setInputRoom] = useState('');


  const createRoom = () => {
    const newRoom = generateRoomCode();
    setRoomId(newRoom);
  };

  const joinRoom = () => {
    if (inputRoom.length === 5 && /^\d{5}$/.test(inputRoom)) {
      setRoomId(inputRoom);
    } else {
      alert('Please enter a valid 5-digit room code');
    }
  };

  if (roomId) {
    return (
      <>
        <Toaster />
     
      </>
    );
  }

  return (
    <>
      <Toaster />
      <RoomSetup
        inputRoom={inputRoom}
        setInputRoom={setInputRoom}
        createRoom={createRoom}
        joinRoom={joinRoom}
      />
    </>
  );
};

export default App;
