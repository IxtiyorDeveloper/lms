import React, { FC, useEffect, useState } from "react";
import { Inviter, SessionState, UserAgent, Registerer } from "sip.js";

interface IProps {
  children: React.ReactNode;
  gatewayUrl: string;
  host: string;
  user: string;
  password: string;
  autoRegister: boolean; // true by default, see jssip.UA option register
  autoAnswer: boolean; // automatically answer incoming calls; false by default
  iceRestart: boolean; // force ICE session to restart on every WebRTC call; false by default
  sessionTimersExpires: number; //
  debug: boolean; // wh
  iceServers: any;
}

const SipjsProvider: FC<IProps> = (props) => {
  const [ua, setUa] = useState<UserAgent>();

  useEffect(() => {
    let userAgent: UserAgent;
    const start = () => {
      userAgent = new UserAgent({
        uri: UserAgent.makeURI(`sip:${props.user}@${props.host}`),
        transportOptions: {
          server: props.gatewayUrl,
        },

        authorizationUsername: props.user,
        authorizationPassword: props.password,
        logBuiltinEnabled: false,
      });

      userAgent.start().then((response) => {
        const reg = new Registerer(userAgent);
        reg.register();
        setUa(userAgent);

        // Set target destination (callee)
        const target = UserAgent.makeURI(`sip:945667725@${props.host}`);
        if (!target) {
          throw new Error("Failed to create target URI.");
        }

        // Create a user agent client to establish a session
        const inviter = new Inviter(userAgent, target, {
          sessionDescriptionHandlerOptions: {
            constraints: { audio: true, video: false },
          },
        });
        inviter.invite();
        // inviter.cancel();
      });
    };
    start();

    return () => {
      ua && ua?.reconnect?.();
      //   start();
    };
  }, []);

  return <div>{props.children}</div>;
};

export default SipjsProvider;
