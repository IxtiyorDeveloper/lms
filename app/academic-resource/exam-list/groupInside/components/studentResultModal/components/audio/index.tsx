import { Spin } from "antd";
import { useRef, useState, useEffect } from "react";
import { getMinutAndSecond } from "utils/number";
import WavesurferComponent from "react-wavesurfer.js";
import { Wrapper } from "./style";
import { setAudio } from "store/slices/audio";
import { useDispatch } from "react-redux";
import { useAppSelector } from "store";
import { bgColors } from "styles/theme";
import {
  PauseMediumSvg,
  PlayMediumSvg,
} from "@jasurbekyuldashov/lms-web-icons";

type Props = {
  id: number;
  url: string;
  is_playing?: boolean;
};

const Audio = ({ id, url, is_playing }: Props) => {
  const ref = useRef<any>(null);
  const dispatch = useDispatch();
  const { audio } = useAppSelector((state) => state.audio);

  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [loading, setLoading] = useState(false);

  const handlePositionChange = (position: any) => {
    setPosition(position);
  };

  useEffect(() => {
    if (!loading) {
      setDuration(
        Number(ref?.current?.wavesurfer?.decodedData?.duration.toFixed() ?? 0)
      );
    }
  }, [loading]);

  const currentAudio = audio?.[id];
  const handleControl = () => {
    dispatch(
      setAudio({
        [id]: {
          url: url,
          playing: !currentAudio?.playing,
        },
      })
    );
  };

  if (!url) return null;
  return (
    <Wrapper className="audio">
      {loading ? (
        <div className="laoding">
          <Spin />
        </div>
      ) : (
        <div>
          <div className="play_pause_btn" onClick={handleControl}>
            {currentAudio?.playing ? <PauseMediumSvg /> : <PlayMediumSvg />}
          </div>
        </div>
      )}

      <WavesurferComponent
        ref={ref}
        src={url}
        hideScrollbar={true}
        hideCursor={true}
        duration={duration}
        barWidth={4}
        height={28}
        // barGap={2}
        // minPxPerSec={1}
        // barRadius={3}
        cursorWidth={0}
        playing={!loading && currentAudio?.playing}
        progressColor={bgColors.primary}
        cursorColor={bgColors.harrison}
        onReady={() => {
          setLoading(false);
          dispatch(
            setAudio({
              [id]: {
                url: url,
                playing: !!is_playing,
              },
            })
          );
        }}
        onLoading={() => setLoading(true)}
        onPositionChange={handlePositionChange}
        onAudioprocess={(e: any) => {
          setPosition(e.originalArgs[0]);
          setDuration(e?.wavesurfer?.decodedData?.duration.toFixed());
        }}
        onFinish={() => {
          setPosition(0);
          dispatch(setAudio(null));
          ref.current?.wavesurfer?.seekTo(0);
        }}
      />
      {!loading && (
        <p>{getMinutAndSecond((duration - (position ?? 0)).toFixed(0))}</p>
      )}
    </Wrapper>
  );
};

export default Audio;
