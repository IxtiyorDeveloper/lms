export const pauseAudio = (id: string) => {
  const audio = document.getElementById(id) as HTMLAudioElement | null;

  if (audio) {
    audio.pause();
  }
};
