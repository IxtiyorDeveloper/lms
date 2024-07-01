import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Wrapper } from "./style";
import _ from "lodash";
import { DraggableSvg } from "@jasurbekyuldashov/lms-web-icons";
import IncomeSessionCall from "./components/incomeSession";
import { SIP_ACTIVE_CALL_ID } from "constants/tokenNames";
import { setIsActiveSip, useAppSelector } from "store";
import { useDispatch } from "react-redux";

const CallModal = () => {
  const dispatch = useDispatch();
  const isActiveSip = useAppSelector((state) => state.ui.isActiveSip);
  const [sessions, isHave, isPlaying] = useAppSelector((state: any) => {
    let isHave = false;
    let direction: string = "";
    const sessions: any[] = _.sortBy(state?.sip?.sip?.sessions, (e) => {
      let is = !e.isEstablished();
      if (!is) {
        isHave = true;
      } else {
        direction = e.direction;
      }
      return is;
    });
    return [sessions, isHave, !isHave ? direction : "speaking"];
  });
  const remoteAudio = useRef<HTMLAudioElement | any>();

  const list = sessions.filter(
    (e: any) => e?.connection?.connectionState != "closed",
  );

  const count = list.length || 0;

  const length = useMemo(() => {
    let count = 0;
    (sessions || []).map((e: any) => {
      if (e?.connection?.connectionState != "closed") {
        count += 1;
      }
    });
    return count;
  }, [sessions, isHave]);

  const [storage, setStorage] = useState<any>();
  const [ringtone, setRingtone] = useState<any>(
    parseInt(localStorage.getItem("ringtone") || "80"),
  );

  const reConnect = () => {
    if (isActiveSip) {
      dispatch(setIsActiveSip(false));
      setTimeout(() => {
        dispatch(setIsActiveSip(true));
      }, 500);
    }
  };

  useEffect(() => {
    const a = setInterval(() => {
      const newValue = parseInt(localStorage.getItem("ringtone") || "80");
      const s = localStorage.getItem(SIP_ACTIVE_CALL_ID);
      newValue != ringtone && setRingtone(newValue);
      storage != s && setStorage(s);
    }, 1000);
    return () => {
      clearInterval(a);
    };
  }, [isHave]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isActiveSip && count == 0) {
        reConnect();
      }
    }, 25000);

    return () => {
      clearInterval(intervalId);
    };
  }, [count, isActiveSip]);

  useEffect(() => {
    const audio = new Audio();
    const ringtone = parseInt(localStorage.getItem("ringtone") || "70");

    if (!isHave) {
      // if (count == 0) {
      //   reConnect();
      // }
      audio.volume = ringtone / 100;

      switch (isPlaying) {
        case "incoming":
          audio.currentTime = 0;
          audio.src = "/ringtones/creq.mp3";
          audio.loop = true;
          audio.play();
          break;
        case "end":
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
  }, [isPlaying, isHave]);

  const content = (
    <>
      {list?.map((e: any, index: number) => {
        const isEstablished = e.isEstablished();

        return (
          <>
            <IncomeSessionCall
              isActive={isHave ? isEstablished : index === 0}
              isEstablished={isEstablished}
              rtcSession={e}
              key={e.id}
              count={count}
              remoteAudio={remoteAudio}
            />
            <div className="center">
              <canvas id={e.id} height="20px"></canvas>
            </div>
          </>
        );
      })}
    </>
  );

  return (
    <Fragment>
      {length > 0 ? (
        // <Draggable defaultPosition={{ x: -600, y: 300 }}>
        <Wrapper>
          <div className="draggable-custom">
            <div className="header">
              <div>Caller ({length})</div>
              <div>
                <DraggableSvg />
              </div>
            </div>
            <div style={{ position: "relative" }}>{content}</div>
          </div>
        </Wrapper>
      ) : null}
      <audio ref={remoteAudio} className="remoteAudio" id="remoteAudio" />
    </Fragment>
  );
};

export default CallModal;
