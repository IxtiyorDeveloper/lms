import React, { FC, Fragment, useRef } from "react";
import { setSip, useAppSelector } from "store";
import { useDispatch } from "react-redux";
import { SipProvider } from "./components/sipProvider/index";
import env from "utils/env";

interface IProps {
  audioId?: string;
}

export const IceServers: RTCIceServer[] = [
  {
    urls: [
      "turn:sip-service.inter-nation.uz:3478",
      // "stun:stun1.l.google.com:19302",
      // "stun:stun.l.google.com:19302",
    ],
    username: "websip",
    credential: "websip",
  },
];

const Sip: FC<IProps> = () => {
  const dispatch = useDispatch();
  const ref = useRef<any>();
  const connectionConfig = useAppSelector(
    (state) => state.sip.connectionConfig,
  );
  const isActiveSip = useAppSelector((state) => state.ui.isActiveSip);

  const onRefChange = (node: any) => {
    if (!!node) {
      dispatch(setSip({ ref: node }));
      ref.current = node;
    }
  };

  if (!connectionConfig || !isActiveSip) {
    return null;
  }

  return (
    <Fragment>
      <SipProvider
        gatewayUrl={env.pbxProxy}
        host={connectionConfig.server}
        user={connectionConfig.user as string}
        password={connectionConfig.password as string} // usually required (e.g. from ENV or props)
        autoRegister={true} // true by default, see jssip.UA option register
        autoAnswer={false} // automatically answer incoming calls; false by default
        iceRestart={true} // force ICE session to restart on every WebRTC call; false by default
        sessionTimersExpires={2000}
        debug={false} // wh
        ref={onRefChange}
        audioId="remoteAudio"
        iceServers={IceServers}
        setAction={(data: any) => {
          dispatch(setSip({ ...data, ref: ref.current }));
        }}
      />
    </Fragment>
  );
};

export default Sip;
