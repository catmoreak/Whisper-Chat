const adjectives = ['Silent', 'Shadow', 'Cyber', 'Ghost', 'Binary', 'Quantum', 'Crypto', 'Neural', 'Phantom', 'Digital','Brain','Nebula','Nova','Astra','Legend','Hyper'];
const nouns = ['Hawk', 'Blade', 'Node', 'Pulse', 'Matrix', 'Vector', 'Nexus', 'Cipher', 'Echo', 'Core','Byte','Pixel','Rudra','Mini','Maxi','Virati','Zenith'];

export function generateUsername(): string {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj}${noun}`;
}

export function generateRoomCode(): string {
  return Math.floor(10000 + Math.random() * 90000).toString();
}