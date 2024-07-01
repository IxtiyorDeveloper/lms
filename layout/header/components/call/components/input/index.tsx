import React, { useEffect } from "react";
import { setSipMuted, useAppSelector } from "store";
import env from "utils/env";
import { Wrapper } from "./style";
import { useForm } from "react-hook-form";
import { CallSvg, MicrophoneSvg, PhoneNumberInput } from "components";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { SipChannelName } from "constants/tokenNames";

export default function InputWithActions() {
  const dispatch = useDispatch();
  const sip = useAppSelector((state) => state.sip.sip);
  const isMuted = useAppSelector((state) => state.sip.isMuted);
  const { control, getValues } = useForm();

  const call = (number?: string) => {
    if (number) {
      try {
        sip.ref?.startCall(`sip:${number.slice(4)}@${env.pbxUrl}`);
      } catch (e) {
        toast.error("Try another number!");
      }
    } else {
      const number = getValues("phone_number");
      number?.length > 0 && call(number);
    }
  };

  useEffect(() => {
    const listener = (event: any) => {
      if (event.key === "Enter") {
        const number = getValues("phone_number");
        number.length > 0 && call(number);
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [open, sip?.ref?.startCall]);

  const changeMicrophone = () => {
    dispatch(setSipMuted(!isMuted));
  };

  useEffect(() => {
    const channel = new BroadcastChannel(SipChannelName);

    channel.onmessage = (event) => {
      try {
        sip.ref?.startCall(event.data);
      } catch (e) {
        toast.error("Try another number!");
      }
    };

    return () => {
      channel.close();
    };
  }, [sip?.ref?.startCall]);

  return (
    <Wrapper>
      <PhoneNumberInput name="phone_number" control={control} />
      <div
        className="btn voice"
        style={{
          backgroundColor: isMuted ? "#E6E8EC" : undefined,
        }}
        onClick={changeMicrophone}
      >
        <MicrophoneSvg
          color={isMuted ? "#E92857" : "#B1B5C4"}
          width={16}
          height={16}
        />
      </div>
      <div className="btn" onClick={() => call()}>
        <CallSvg width={14} height={14} />
      </div>
    </Wrapper>
  );
}
