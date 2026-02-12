import CryptoJS from 'crypto-js';

export const generateKey = (roomCode: string): string => {
  return CryptoJS.SHA256(roomCode).toString();
};
export const encryptMessage = (message: string, key: string): string => {
  return CryptoJS.AES.encrypt(message, key).toString();
};
export const decryptMessage = (encryptedMessage: string, key: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption failed:', error);
    return '[Encrypted message has error because the  decryption has failed]';
  }
};