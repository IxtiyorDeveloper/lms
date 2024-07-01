import { FC, memo, useEffect, useRef } from "react";
import { TMusic } from "../income";

const AudioPlayer: FC<{
  isPlaying: TMusic | undefined;
  id: string;
  storage: any;
  ringtone: any;
}> = ({ isPlaying = "incoming", storage, ringtone }) => {
  // const windowIsActive = useAppSelector((state) => state.ui.isWindowActive);

  const audio = useRef(new Audio("/ringtones/creq.mp3")).current;
  useEffect(() => {
    if (!storage) {
      audio.volume = ringtone / 100;

      switch (isPlaying) {
        case "incoming":
          audio.pause();
          audio.currentTime = 0;
          audio.src = "/ringtones/creq.mp3";
          audio.loop = true;
          audio.play();
          break;
        case "end":
          audio.pause();
          audio.currentTime = 0;
          audio.loop = false;
          audio.src = "/ringtones/call_end.mp3";
          audio.play();
          break;
        case "outgoing":
          break;
        case "speaking":
          audio.pause();
          audio.currentTime = 0;
          audio.loop = false;
          break;
      }
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = ringtone / 100;
    };
  }, [isPlaying, storage, ringtone]);

  return null;
};

export default memo(AudioPlayer);
