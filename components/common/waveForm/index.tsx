import React, { FC } from "react";

// const formWaveSurferOptions = (ref: any) => ({
//     container: ref,
//     waveColor: "#979C9E",
//     progressColor: "#FFC700",
//     // cursorColor: "#FFC700",
//     barWidth: 3,
//     barRadius: 3,
//     responsive: true,
//     height: 20,
//     normalize: true,
//     partialRender: true,
//     cursorWidth: 0,
//     // backend: 'MediaElement',
//     // mediaType:'audio',
// });

const AudioControl: FC<{ url: string }> = ({ url }) => {
  // const waveformRef = useRef<any>(null);
  // const wavesurfer = useRef<any>(null);
  // const [volume, setVolume] = useState(0.5);
  // const [mute, setMute] = useState(false);
  // const [currentTime, setCurrentTime] = useState(0);
  //
  // const handlePlayPause = () => {
  //     wavesurfer.current.playPause();
  // };
  //
  // const handleMute = () => {
  //     if (wavesurfer.current) {
  //         setMute(!mute);
  //         wavesurfer.current.toggleMute();
  //     }
  // };
  //
  // useEffect(() => {
  //     if (url?.length) {
  //         const options = formWaveSurferOptions(waveformRef.current);
  //         wavesurfer.current = WaveSurfer.create(options);
  //
  //         wavesurfer.current.load(url);
  //         wavesurfer.current.on("ready", function () {
  //             if (wavesurfer.current) {
  //                 wavesurfer.current.setVolume(volume);
  //                 setVolume(volume);
  //             }
  //         });
  //
  //         return () => wavesurfer.current.destroy();
  //     }
  // }, [url]);
  //
  // useEffect(() => {
  //     if (wavesurfer.current) {
  //         wavesurfer.current.on("audioprocess", function (e: any) {
  //             setCurrentTime(e);
  //         });
  //
  //         waveformRef.current.addEventListener("click", function (e: any) {
  //             const rect = waveformRef.current.getBoundingClientRect();
  //             const x = e.clientX - rect.left;
  //             const percent = x / rect.width;
  //             wavesurfer.current.seekTo(percent);
  //             setCurrentTime(percent);
  //         });
  //     }
  // }, []);
  //
  // useEffect(() => {
  //     if (wavesurfer.current) {
  //         wavesurfer.current.on("ready", function () {
  //             if (!wavesurfer.current.loaded) {
  //                 wavesurfer.current.loaded = true;
  //                 wavesurfer.current.play();
  //             }
  //         });
  //     }
  // }, []);
  //
  // useEffect(() => {
  //     setCurrentTime(0);
  // }, [url]);
  //
  // const handleSpeed = () => {
  //     wavesurfer.current.playbackRate = 2.0;
  // };
  //
  // useEffect(() => {
  //     if (wavesurfer.current) {
  //         wavesurfer.current.play();
  //     } else {
  //         wavesurfer.current?.pause();
  //     }
  // }, []);

  return (
    <div>
      {/*<div>*/}
      {/*    <div>*/}
      {/*        <div id="waveform" ref={waveformRef} />*/}
      {/*    </div>*/}
      {/*    <Row gutter={70} align="middle" justify="center">*/}
      {/*        <Col*/}
      {/*            onClick={handleMute}*/}
      {/*        >*/}
      {/*        </Col>*/}
      {/*        <Col>*/}
      {/*            <Row align="middle" gutter={20}>*/}
      {/*                <Col*/}
      {/*                    onClick={handlePlayPause}*/}
      {/*                ></Col>*/}
      {/*            </Row>*/}
      {/*        </Col>*/}
      {/*    </Row>*/}
      {/*</div>*/}
    </div>
  );
};

export default AudioControl;
