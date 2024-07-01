import React, { FC, memo, useEffect, useMemo, useRef, useState } from "react";
import { Spin } from "antd";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  ActiveCallWrapper,
  BtnSecondary,
  MiniUserCardWrapper,
  SecondaryWrapper,
} from "./style";
import { useCallUserFilter } from "../hook";
import { useCallUserList } from "hooks/useCall";
import UserCard, { IProps, statusNames } from "../userCard";
import { RTCSession } from "jssip/lib/RTCSession";
import moment from "moment/moment";
import { CallSvg, NewIncomingSvg, NewOutgoingSvg } from "components";
import TransferCall from "../transfer";
import HistoryCall from "../history";
// import AudioPlayer from "../audioPlayer";
import CallActions from "../callActions";
import { PhoneTypes } from "constants/phoneTypes";
import { SIP_ACTIVE_CALL_ID } from "constants/tokenNames";
import { IceServers } from "globals/components/sip";
import { store, useAppSelector } from "store";
import { bgColors } from "../../../../../styles/theme";

export type CallStatus = "talk" | "failed" | "ringing";

export interface ICall {
  isTalking: CallStatus;
  isDisabled: boolean;
  isActiveHistory: boolean;
  isActiveMute: boolean;
  isActiveTransfer: boolean;
  status: string;
}

export type TMusic = "incoming" | "outgoing" | "end" | "speaking";

interface IProps1 {
  rtcSession: RTCSession;
  isEstablished: boolean;
  isActive: boolean;
  count: number;
  isActiveAnimation: boolean;
}

const copyToClipboard = (phone: string | 0) => {
  if (!!phone)
    navigator.clipboard
      .writeText(phone)
      .then(() => {
        toast.info("Copied to clipboard");
      })
      .catch((err) => {
        toast.error(err.message);
      });
};

const IncomeSessionCall: FC<IProps1> = ({
  rtcSession,
  isEstablished,
  isActive,
  count,
  isActiveAnimation = false,
}) => {
  const volume = useAppSelector((state) => state.ui.volume);
  const [call, setCall] = useState<ICall>({
    isTalking: !isEstablished ? "ringing" : "talk",
    isDisabled: true,
    isActiveHistory: false,
    isActiveMute: false,
    isActiveTransfer: false,
    status: "--:--",
  });
  const { watch, setValue } = useForm<{
    phone_number: string;
    isPlaying: TMusic;
  }>({
    defaultValues: {
      phone_number: "",
    },
  });
  const phone = watch("phone_number");

  const { data, isLoading } = useCallUserList({
    enabled: !!phone,
    query_params: {
      phone_number: phone,
    },
  });
  const users = useCallUserFilter(data);

  const getNumber = () => {
    const sipUri = rtcSession.remote_identity.uri.user || "";
    // @ts-ignore
    const phoneNumber = sipUri && sipUri.match(/\d+/)?.[0];
    return phoneNumber
      ? `(${phoneNumber.substr(0, 2)}) ${phoneNumber.substr(
          2,
          3,
        )} ${phoneNumber.substr(5, 2)} ${phoneNumber.substr(
          7,
          2,
        )} ${phoneNumber.substr(10, 2)}`
      : sipUri;
  };
  const acceptCall = () => {
    try {
      rtcSession.answer?.({
        mediaConstraints: {
          audio: true,
          video: false,
        },
        pcConfig: {
          iceServers: IceServers,
        },
      });
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  const cancelCallForAuto = () => {
    try {
      call.isTalking === "talk" && rtcSession?.terminate?.();
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  const cancelCall = () => {
    try {
      rtcSession?.terminate?.();
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  function startVoiceAnimation(stream: any) {
    if (!stream) {
      return;
    }
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvas: any = document.getElementById(rtcSession.id);
    const canvasCtx = canvas?.getContext("2d");

    function draw() {
      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      canvasCtx.fillStyle = "rgb(0, 0, 0)";
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        canvasCtx.fillStyle = bgColors.white;
        canvasCtx.fillRect(
          x,
          canvas.height - barHeight / 2,
          barWidth,
          barHeight / 2,
        );

        x += barWidth + 1;
      }
    }

    draw();
  }

  const remoteAudio = useRef<any>();

  useEffect(() => {
    remoteAudio.current = window.document.createElement(
      "audio",
    ) as HTMLAudioElement;
    window.document.body.appendChild(remoteAudio.current);
    remoteAudio.current.setAttribute("class", "remoteAudio");

    return () => {
      window.document.body.removeChild(remoteAudio.current);
    };
  }, []);

  useEffect(() => {
    remoteAudio.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    // const isPlaying = !isEstablished ? rtcSession.direction : "speaking";
    if (rtcSession.direction === "outgoing") {
      let played: any;
      rtcSession?.connection?.addEventListener?.("addstream", (event: any) => {
        remoteAudio.current.srcObject = event.stream;
        played = remoteAudio.current.play(); // Play the received audio
        if (typeof played !== "undefined") {
          played
            .catch(() => {
              /**/
            })
            .then(() => {
              setTimeout(() => {
                remoteAudio.current.play();
              }, 2000);
            });
          return;
        }
        setTimeout(() => {
          remoteAudio.current.play();
        }, 2000);
        try {
          isActiveAnimation && startVoiceAnimation(event.stream);
        } catch (e) {}
      });
    }
    rtcSession.on("progress", function (data: any) {
      if (isActiveAnimation) {
        [remoteAudio.current.srcObject] =
          rtcSession.connection.getRemoteStreams();
        try {
          startVoiceAnimation(remoteAudio.current.srcObject);
        } catch (e) {}
      }
      data.body = null;
    });
    rtcSession.on("accepted", () => {
      setInterval(() => {
        remoteAudio.current.volume = store.getState().ui.volume / 100;
      }, 1000);
      [remoteAudio.current.srcObject] =
        rtcSession.connection.getRemoteStreams();

      const played = remoteAudio.current.play();

      if (typeof played !== "undefined") {
        played
          .catch(() => {
            /**/
          })
          .then(() => {
            setTimeout(() => {
              remoteAudio.current.play();
            }, 2000);
          });

        return;
      }

      setTimeout(() => {
        remoteAudio.current.play();
      }, 2000);
      try {
        isActiveAnimation && startVoiceAnimation(remoteAudio.current.srcObject);
      } catch (e) {}
    });
    setValue("phone_number", getNumber());

    window.addEventListener(
      "beforeunload",
      function () {
        cancelCallForAuto();
        return false;
      },
      { once: false, capture: false, passive: false },
    );

    const listener = (event: any) => {
      if (event.code === "Escape") {
        cancelCall();
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [count, isEstablished, volume, isActiveAnimation]);

  useEffect(() => {
    let a: any;
    if (isEstablished) {
      if (localStorage.getItem(SIP_ACTIVE_CALL_ID) != rtcSession.id) {
        window.localStorage.setItem(SIP_ACTIVE_CALL_ID, rtcSession.id);
        window.dispatchEvent(new Event("SIP_ACTIVE_CALL_ID"));
      }
      a = setInterval(() => {
        setCall((call) => ({
          ...call,
          status: `${moment
            .utc(moment().diff(moment(rtcSession.start_time), "milliseconds"))
            .format("mm:ss")}`,
        }));
      }, 2100);
      rtcSession.on("ended", () => {
        if (localStorage.getItem(SIP_ACTIVE_CALL_ID) == rtcSession.id) {
          window.localStorage.removeItem(SIP_ACTIVE_CALL_ID);
          window.dispatchEvent(new Event("SIP_ACTIVE_CALL_ID"));
        }
      });
      rtcSession.on("failed", () => {
        if (localStorage.getItem(SIP_ACTIVE_CALL_ID) == rtcSession.id) {
          window.localStorage.removeItem(SIP_ACTIVE_CALL_ID);
          window.dispatchEvent(new Event("SIP_ACTIVE_CALL_ID"));
        }
      });
    }

    return () => clearInterval(a);
  }, [isEstablished]);

  const content = (
    <div>
      {isEstablished
        ? call.status
        : rtcSession.direction === "incoming"
          ? "Incall"
          : "Outcall"}
    </div>
  );

  if (isActive) {
    return (
      <ActiveCallWrapper>
        <Spin spinning={isLoading}>
          <div className="user">
            {(users.length > 0 ? users : [{ fullname: "Unknown" }]).map(
              (user) => {
                return (
                  <UserCard
                    className={
                      (users?.length || 1) === 1 ? "minWidth100" : "user_item"
                    }
                    user={user as IProps["user"]}
                    count={users?.length || 1}
                  />
                );
              },
            )}
          </div>
          <div className="phone-container">
            <div className="flex-1">
              <div className="call-icon">
                {rtcSession.direction === "incoming" ? (
                  <NewIncomingSvg />
                ) : (
                  <NewOutgoingSvg />
                )}
              </div>
              {content}
            </div>
            <div
              className="phone-info pointer"
              onClick={() => {
                const sipUri = rtcSession.remote_identity.uri.user || "";
                // @ts-ignore
                const phoneNumber = sipUri && sipUri.match(/\d+/)?.[0];
                copyToClipboard(phoneNumber || sipUri);
              }}
            >
              {getNumber()}
            </div>
          </div>
        </Spin>
        <CallActions
          call={call}
          setCall={setCall}
          acceptCall={acceptCall}
          cancelCall={cancelCall}
          rtcSession={rtcSession}
          isEstablished={isEstablished}
        />
        {call.isActiveTransfer ? (
          <TransferCall rtcSession={rtcSession} />
        ) : (
          call.isActiveHistory && <HistoryCall rtcSession={rtcSession} />
        )}
        {/* <AudioPlayer
          id={rtcSession.id}
          isPlaying={isPlaying}
          storage={storage}
          ringtone={ringtone}
        /> */}
      </ActiveCallWrapper>
    );
  }

  if (call.isActiveTransfer || call.isActiveHistory) {
    return null;
  }

  const firstUser = users?.[0];

  return (
    <SecondaryWrapper>
      <div className="flex">
        <div className="flex-1">
          <div className="call-icon">
            {rtcSession.direction === "incoming" ? (
              <NewIncomingSvg />
            ) : (
              <NewOutgoingSvg />
            )}
          </div>
          <div
            className="phone-info-secondary pointer"
            onClick={() => {
              const sipUri = rtcSession.remote_identity.uri.user || "";
              // @ts-ignore
              const phoneNumber = sipUri && sipUri.match(/\d+/)?.[0];
              copyToClipboard(phoneNumber || sipUri);
            }}
          >
            {getNumber()}
          </div>
        </div>
        <div className="actions">
          {rtcSession.direction === "incoming" && (
            <BtnSecondary onClick={acceptCall}>
              <CallSvg />
            </BtnSecondary>
          )}
          <BtnSecondary bgColor="#E92857" onClick={cancelCall}>
            <CallSvg style={{ transform: "rotate(135deg)", marginTop: 1 }} />
          </BtnSecondary>
        </div>
      </div>
      <MiniUserCardWrapper user={firstUser} count={1}>
        <div className="statuses">
          <div className="status">
            {firstUser?.status
              ? statusNames[firstUser?.status as keyof typeof statusNames] ||
                "_"
              : "User status"}
          </div>
          <div className="numberType">
            {firstUser?.numberType
              ? PhoneTypes[firstUser?.numberType]
              : "Number type"}
          </div>
        </div>
        <div className="fullname">
          ({users?.length}) {firstUser?.fullName}
        </div>
      </MiniUserCardWrapper>
    </SecondaryWrapper>
  );
};

export default memo(IncomeSessionCall);
