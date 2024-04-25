import { useState } from "react";

const useSoundPlaying = () => {
  const [volume, setVolume] = useState(0.1);

  const handleChangeVolume = (vol: number) => {
    setVolume(vol);
  };

  const playSound = (source: string, timing: number) => {
    const audio = new Audio(`/${source}.mp3`);
    audio.volume = volume;

    const timer = setTimeout(() => {
      audio.play();
    }, timing);
    return () => {
      clearTimeout(timer);
    };
  };

  return { handleChangeVolume, volume, playSound };
};

export default useSoundPlaying;
