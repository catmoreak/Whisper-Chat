export interface Message {
  text: string;
  timestamp: number;
  id: string;
  username: string;
  mediaUrl?: string;
  mediaType?: 'image';
}

export interface RoomData {
  users: { [key: string]: { lastSeen: number } };
  messages: { [key: string]: Message };
}