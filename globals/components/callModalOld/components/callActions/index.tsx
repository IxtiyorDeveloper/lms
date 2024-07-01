import React, { useEffect } from "react";
import { Btn, Wrapper } from "./style";
import {
  CallSvg,
  MicrophoneSvg,
  TimeWaitingSvg,
  TransferShadowSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import { toast } from "react-toastify";
import { ICall } from "../incomeSession";
import { useAppSelector } from "store";

interface IProps {
  call: ICall;
  rtcSession: any;
  setCall: any;
  isEstablished: boolean;
  acceptCall: any;
  cancelCall: any;
}

function CallActions({
  call,
  rtcSession,
  setCall,
  isEstablished,
  acceptCall,
  cancelCall,
}: IProps) {
  const isMuted = useAppSelector((state) => state.sip.isMuted);

  const handleMute = (isMutedItem?: boolean) => {
    if (!!isMutedItem) {
      setCall({
        ...call,
        isActiveMute: !isMutedItem,
      });
    } else {
      setCall({
        ...call,
        isActiveMute: !call.isActiveMute,
      });
      try {
        if (call.isActiveMute) {
          rtcSession.mute();
        } else {
          rtcSession.unmute();
        }
      } catch (e) {
        toast.error("Mute not working!");
      }
    }
  };

  useEffect(() => {
    handleMute(isMuted);
    const a = setTimeout(() => {
      try {
        if (isMuted) {
          rtcSession.mute();
        } else {
          rtcSession.unmute();
        }
      } catch (e) {
        toast.error("Mute not working!");
      }
    }, 100);
    return () => {
      handleMute(isMuted);
      clearTimeout(a);
    };
  }, [isMuted]);

  return (
    <Wrapper>
      {rtcSession.direction === "incoming" && !isEstablished ? (
        <Btn bgColor="#44B26B" onClick={acceptCall}>
          <CallSvg />
        </Btn>
      ) : (
        <Btn
          bgColor={call.isActiveTransfer ? "#6084FF" : undefined}
          onClick={() => {
            setCall({
              ...call,
              isActiveHistory: false,
              isActiveTransfer: !call.isActiveTransfer,
            });
          }}
        >
          <TransferShadowSvg
            color={call.isActiveTransfer ? "#FFF" : "#B1B5C4"}
          />
        </Btn>
      )}
      <Btn
        bgColor={call.isActiveHistory ? "#FFCF00" : undefined}
        onClick={() => {
          setCall({
            ...call,
            isActiveHistory: !call.isActiveHistory,
            isActiveTransfer: false,
          });
        }}
      >
        <TimeWaitingSvg color={call.isActiveHistory ? "#353945" : "#B1B5C4"} />
      </Btn>
      <Btn
        id="mute-btn"
        bgColor={!call.isActiveMute ? "#E6E8EC" : undefined}
        onClick={() => handleMute()}
      >
        <MicrophoneSvg color={!call.isActiveMute ? "#E92857" : "#B1B5C4"} />
      </Btn>
      <Btn bgColor="#E92857" onClick={cancelCall}>
        <CallSvg style={{ transform: "rotate(135deg)", marginTop: 4 }} />
      </Btn>
    </Wrapper>
  );
}

export default CallActions;
