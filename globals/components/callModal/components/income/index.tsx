import React, { Fragment, useEffect, useState } from "react";
import { Spin } from "antd";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { changeCallModalSize, IStore } from "store";
import { Wrapper } from "./style";
import { useCallUserFilter } from "../hook";
import { useCallUserList } from "hooks/useCall";
import UserCard, { IProps } from "../userCard";
import PhoneContainer from "../phoneContainer";
import { RTCSession } from "jssip/lib/RTCSession";
import moment from "moment/moment";
import { Moment } from "moment";
import { CallSvg } from "components";
import TransferCall from "../transfer";
import HistoryCall from "../history";
import AudioPlayer from "../audioPlayer";
import SpeakingLittle from "../speakingLittle";
import { Action_Heights, Action_Widths } from "../../index";
import CallHeader from "../header";

export type CallStatus = "talk" | "failed" | "ringing";

interface ICall {
  isTalking: CallStatus;
  time: Moment;
  isDisabled: boolean;
  isActiveHistory: boolean;
  isActiveMute: boolean;
  isActiveTransfer: boolean;
  status: string;
}

export type TMusic = "incoming" | "outgoing" | "end" | "speaking";

const IncomeCall = () => {
  // const io = useSocketIO() as any;
  // const sip = useSelector((state: IStore) => state.sip.sip);
  const dispatch = useDispatch();
  const [isBig, setIsBig] = useState(true);

  const [call, setCall] = useState<ICall>({
    isTalking: "ringing",
    time: moment(),
    isDisabled: true,
    isActiveHistory: false,
    isActiveMute: false,
    isActiveTransfer: false,
    status: "_",
  });

  const { control, watch, setValue } = useForm<{
    phone_number: string;
    isPlaying: TMusic;
  }>({
    defaultValues: {
      phone_number: "",
    },
  });
  const phone = watch("phone_number");
  const [isPlaying, setIsPlaying] = useState<TMusic>();

  const { data, isLoading } = useCallUserList({
    enabled: !!phone,
    query_params: {
      phone_number: phone,
    },
  });
  const users = useCallUserFilter(data);

  const getNumber = () => {
    const sipUri = sip.callCounterpart || "";
    // @ts-ignore
    const phoneNumber = sipUri && sipUri.match(/\d+/)[0];
    return `+998 ${phoneNumber.substr(0, 2)} ${phoneNumber.substr(
      2,
      3
    )} ${phoneNumber.substr(5, 2)} ${phoneNumber.substr(
      7,
      2
    )} ${phoneNumber.substr(10, 2)}`;
  };

  const acceptCall = () => {
    try {
      sip.ref?.answerCall?.();
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  const cancelCall = () => {
    // try {
    //   sip.ref?.stopCall?.();
    // } catch (e) {
    //   toast.error("Something went wrong!");
    // }
  };

  useEffect(() => {
    (sip.rtcSession as RTCSession)?.on?.("accepted", () => {
      setCall((prevState) => ({
        ...prevState,
        isTalking: "talk",
        time: moment(),
        isDisabled: false,
        status: "Accepted",
      }));
      // setValue("isPlaying", "speaking");
      setIsPlaying("speaking");
    });
    (sip.rtcSession as RTCSession)?.on?.("confirmed", () => {
      setCall((prevState) => ({
        ...prevState,
        isTalking: "talk",
        time: moment(),
        isDisabled: false,
        isActiveHistory: false,
        isActiveMute: false,
        isActiveTransfer: false,
        status: "Accepted",
      }));
      // setValue("isPlaying", "speaking");
      setIsPlaying("speaking");
    });
    (sip.rtcSession as RTCSession)?.on?.("failed", () => {
      setCall((prevState) => ({
        ...prevState,
        isTalking: "failed",
        time: moment(),
        isDisabled: true,
        isActiveHistory: false,
        isActiveMute: false,
        isActiveTransfer: false,
        status: "Failed",
      }));
      // setValue("isPlaying", "end");
      setIsPlaying("end");
    });
    (sip.rtcSession as RTCSession)?.on?.("ended", () => {
      setCall((prevState) => ({
        ...prevState,
        isTalking: "failed",
        time: moment(),
        isDisabled: true,
        isActiveHistory: false,
        isActiveMute: false,
        isActiveTransfer: false,
        status: "Failed",
      }));
      // setValue("isPlaying", "end");
      setIsPlaying("end");
    });

    setValue("phone_number", getNumber());

    window.addEventListener(
      "beforeunload",
      function () {
        cancelCall();
        return false;
      },
      { once: false, capture: false, passive: false }
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
  }, [isPlaying]);

  useEffect(() => {
    let a: any;
    if (call.isTalking === "talk") {
      // io.emit("remove_from_call", { userId: userId, id: sipId });
      a = setInterval(() => {
        setCall((call) => ({
          ...call,
          status: `${moment
            .utc(moment().diff(call.time, "second") * 1000)
            .format("mm:ss")}`,
        }));
      }, 1000);
    }
    if (call.isTalking === "ringing") {
      // io.emit("CALL", "salom");
      setIsPlaying(
        sip.ref.state?.callDirection === "callDirection/INCOMING" &&
          sip.ref.state?.callStatus === "callStatus/STARTING"
          ? "outgoing"
          : "incoming"
      );
    }

    return () => clearInterval(a);
  }, [call.isTalking, sip.callDirection, sip.ref?.state]);

  const changeCall = (obj: { [key: string]: any }) => {
    return setCall({ ...call, ...obj });
  };

  const onChangeBig = () => {
    setIsBig((prevState) => !prevState);
    dispatch(
      changeCallModalSize(
        call.isTalking === "ringing" &&
          sip.callDirection === "callDirection/INCOMING" &&
          sip.callStatus === "callStatus/STARTING"
          ? {
              height: 110,
              width: 400,
            }
          : {
              height: 110,
              width: 348,
            }
      )
    );
  };

  const returnToBig = () => {
    setIsBig(true);
    dispatch(
      changeCallModalSize({
        height: Action_Heights.income,
        width: Action_Widths.big,
      })
    );
  };

  // useEffect(() => {
  //   io.emit("add_to_call", {
  //     userId: userId,
  //     id: sipId,
  //   });
  // }, []);

  // useEffect(() => {
  //   io.on("add_id", (id: string) => {
  //     setSipId(id);
  //   });

  //   io.on("end_call", (id: string) => {
  //     if (sipId && id !== sipId) {
  //       cancelCall();
  //     }
  //     setSipId(undefined);
  //   });

  //   return () => {
  //     io.off("add_id");
  //     io.off("end_call");
  //   };
  // }, [sipId]);

  return (
    <Fragment>
      <CallHeader text={sip.ref?.state?.callDirection} />
      <Wrapper>
        {isBig ? (
          <>
            {call.isActiveTransfer ? (
              <TransferCall />
            ) : call.isActiveHistory ? (
              <HistoryCall rtcSession={{}} />
            ) : (
              <Spin spinning={isLoading}>
                <div className="user">
                  {(users.length > 0 ? users : [{}]).map((user) => {
                    return (
                      <UserCard
                        className={
                          (users?.length || 1) === 1
                            ? "minWidth100"
                            : "user_item"
                        }
                        user={user as IProps["user"]}
                        count={users?.length || 1}
                      />
                    );
                  })}
                </div>
              </Spin>
            )}
            <PhoneContainer
              control={control}
              phoneName="phone_number"
              status={
                call.isTalking === "ringing"
                  ? sip.callDirection === "callDirection/INCOMING"
                    ? "Connecting..."
                    : "Ringing..."
                  : call.status
              }
              isDisabled={call.isDisabled}
              isActiveMute={call.isActiveMute}
              isActiveHistory={call.isActiveHistory}
              isActiveTransfer={call.isActiveTransfer}
              changeCall={changeCall}
              onClickLittle={onChangeBig}
            />
            {call.isTalking === "ringing" &&
            sip.callDirection === "callDirection/INCOMING" &&
            sip.callStatus === "callStatus/STARTING" ? (
              <div className="buttons">
                <div className="answer" onClick={acceptCall}>
                  <CallSvg />
                </div>
                <div className="cancel" onClick={cancelCall}>
                  <CallSvg style={{ transform: "rotate(135deg)" }} />
                </div>
              </div>
            ) : (
              <div className="cancel" onClick={cancelCall}>
                <CallSvg style={{ transform: "rotate(135deg)" }} />
              </div>
            )}
          </>
        ) : (
          //  I've written such kinda code to fix ts error!
          <SpeakingLittle
            rtcSession={{}}
            call={{}}
            acceptCall={{}}
            cancelCall={{}}
            users={{}}
            returnToBig={returnToBig}
          />
        )}
        <AudioPlayer isPlaying={isPlaying} />
      </Wrapper>
    </Fragment>
  );
};

export default IncomeCall;
