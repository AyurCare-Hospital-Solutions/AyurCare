// Define a function to play audio from a given source URL
export const playAudio = (src: string) => {
  const sound = new Audio(src);
  sound.play().catch(err => console.error("Failed to play audio:", err));
};
