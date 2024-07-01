"use client";
import * as JsSIP from "jssip";
import * as PropTypes from "prop-types";
import * as React from "react";
import dummyLogger from "../../lib/dummyLogger";
import { CallOptions } from "jssip/lib/UA";
import {
  CALL_DIRECTION_INCOMING,
  CALL_DIRECTION_OUTGOING,
  CALL_STATUS_ACTIVE,
  CALL_STATUS_IDLE,
  CALL_STATUS_STARTING,
  CALL_STATUS_STOPPING,
  SIP_ERROR_TYPE_CONFIGURATION,
  SIP_ERROR_TYPE_CONNECTION,
  SIP_ERROR_TYPE_REGISTRATION,
  SIP_STATUS_CONNECTED,
  SIP_STATUS_CONNECTING,
  SIP_STATUS_DISCONNECTED,
  SIP_STATUS_ERROR,
  SIP_STATUS_REGISTERED,
} from "../../lib/enums";
import {
  CallDirection,
  CallStatus,
  SipErrorType,
  SipStatus,
} from "../../lib/enums";
import {
  callPropType,
  ExtraHeaders,
  extraHeadersPropType,
  IceServers,
  iceServersPropType,
  sipPropType,
} from "../../lib/types";
import { toast } from "react-toastify";
import env from "../../../../../../../utils/env";

export default class SipProvider extends React.Component<
  {
    gatewayUrl: string;
    host: string;
    port: number;
    pathname: string;
    user: string;
    password: string;
    autoRegister: boolean;
    autoAnswer: boolean;
    iceRestart: boolean;
    sessionTimersExpires: number;
    extraHeaders: ExtraHeaders;
    iceServers: IceServers;
    debug: boolean;
    setAction: (data: any) => void;
    audioId?: string;
    protocol?: string;
  },
  {
    sipStatus: SipStatus;
    sipErrorType: SipErrorType | null;
    sipErrorMessage: string | null;
    callStatus: CallStatus;
    callDirection: CallDirection | null;
    callCounterpart: string | null;
    rtcSession: any;
    sessions: any[];
  }
> {
  public static childContextTypes = {
    sip: sipPropType,
    call: callPropType,
    registerSip: PropTypes.func,
    unregisterSip: PropTypes.func,

    answerCall: PropTypes.func,
    startCall: PropTypes.func,
    stopCall: PropTypes.func,
  };

  public static propTypes = {
    host: PropTypes.string,
    port: PropTypes.number,
    pathname: PropTypes.string,
    user: PropTypes.string,
    password: PropTypes.string,
    autoRegister: PropTypes.bool,
    autoAnswer: PropTypes.bool,
    iceRestart: PropTypes.bool,
    sessionTimersExpires: PropTypes.number,
    extraHeaders: extraHeadersPropType,
    iceServers: iceServersPropType,
    debug: PropTypes.bool,
    children: PropTypes.node,
    audioId: PropTypes.string,
    setAction: PropTypes.func,
  };

  public static defaultProps = {
    host: null,
    port: null,
    pathname: "",
    user: null,
    password: null,
    autoRegister: true,
    autoAnswer: false,
    iceRestart: false,
    sessionTimersExpires: 120,
    extraHeaders: { register: [], invite: [] },
    iceServers: [],
    debug: false,
    children: null,
    audioId: "sip-provider-audio",
  };
  private ua: JsSIP.UA | null | undefined;
  private remoteAudio: any;
  private logger: any;

  constructor(props: any) {
    super(props);

    this.state = {
      sipStatus: SIP_STATUS_DISCONNECTED,
      sipErrorType: null,
      sipErrorMessage: null,

      rtcSession: null,
      // errorLog: [],
      callStatus: CALL_STATUS_IDLE,
      callDirection: null,
      callCounterpart: null,
      sessions: [],
    };

    this.ua = null;
  }

  public getChildContext() {
    return {
      sip: {
        ...this.props,
        status: this.state.sipStatus,
        errorType: this.state.sipErrorType,
        errorMessage: this.state.sipErrorMessage,
      },
      call: {
        id: "??",
        status: this.state.callStatus,
        direction: this.state.callDirection,
        counterpart: this.state.callCounterpart,
      },
      registerSip: this.registerSip,
      unregisterSip: this.unregisterSip,

      answerCall: this.answerCall,
      startCall: this.startCall,
      stopCall: this.stopCall,
    };
  }

  public componentDidMount() {
    // if (
    //   window.document.getElementById(this.props.audioId || "sip-provider-audio")
    // ) {
    //   throw new Error(
    //     `Creating two SipProviders in one application is forbidden. If that's not the case ` +
    //       `then check if you're using "sip-provider-audio" as id attribute for any existing ` +
    //       `element`
    //   );
    // }

    this.remoteAudio = window.document.createElement("audio");
    this.remoteAudio.class = this.props.audioId || "sip-provider-audio";
    window.document.body.appendChild(this.remoteAudio);

    this.reconfigureDebug();
    this.ua?.unregister?.();
    this.reinitializeJsSIP();
  }

  public componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.debug !== prevProps.debug) {
      this.reconfigureDebug();
    }
    if (
      this.props.gatewayUrl !== prevProps.gatewayUrl ||
      this.props.host !== prevProps.host ||
      this.props.user !== prevProps.user ||
      this.props.password !== prevProps.password ||
      this.props.autoRegister !== prevProps.autoRegister
    ) {
      this.reinitializeJsSIP();
    }
    if (
      this.state.rtcSession !== prevState?.rtcSession ||
      this.state.callCounterpart !== prevState.callCounterpart ||
      this.state.callDirection !== prevState.callDirection ||
      this.state.callStatus !== prevState.callStatus ||
      this.state.sipStatus !== prevState.sipStatus ||
      this.state?.rtcSession?._start_time !==
        prevState?.rtcSession?._start_time ||
      this.state?.sessions?.length !== prevState?.sessions?.length
    ) {
      this.props.setAction(this.state);
    }
  }

  public componentWillUnmount() {
    this.remoteAudio?.parentNode.removeChild(this.remoteAudio);
    delete this.remoteAudio;
    if (this.ua) {
      this.ua.stop();
      this.ua = null;
    }
  }

  public registerSip = () => {
    if (this.props.autoRegister) {
      throw new Error(
        "Calling registerSip is not allowed when autoRegister === true",
      );
    }
    if (this.state.sipStatus !== SIP_STATUS_CONNECTED) {
      throw new Error(
        `Calling registerSip is not allowed when sip status is ${this.state.sipStatus} (expected ${SIP_STATUS_CONNECTED})`,
      );
    }
    return this.ua?.register();
  };

  public unregisterSip = () => {
    if (this.props.autoRegister) {
      throw new Error(
        "Calling registerSip is not allowed when autoRegister === true",
      );
    }
    if (this.state.sipStatus !== SIP_STATUS_REGISTERED) {
      throw new Error(
        `Calling unregisterSip is not allowed when sip status is ${this.state.sipStatus} (expected ${SIP_STATUS_CONNECTED})`,
      );
    }
    return this.ua?.unregister();
  };

  public answerCall = () => {
    if (
      this.state.callStatus !== CALL_STATUS_STARTING ||
      this.state.callDirection !== CALL_DIRECTION_INCOMING
    ) {
      throw new Error(
        `Calling answerCall() is not allowed when call status is ${this.state.callStatus} and call direction is ${this.state.callDirection}  (expected ${CALL_STATUS_STARTING} and ${CALL_DIRECTION_INCOMING})`,
      );
    }

    this.state?.rtcSession?.answer({
      mediaConstraints: {
        audio: true,
        video: false,
      },
      rtcOfferConstraints: {
        iceRestart: this.props.iceRestart,
        offerToReceiveAudio: true,
        offerToReceiveVideo: false,
      },
      pcConfig: {
        iceServers: this.props.iceServers,
      },
    });
  };

  public startCall = (destination: string) => {
    if (!destination) {
      throw new Error(`Destination must be defined (${destination} given)`);
    }
    if (
      this.state.sipStatus !== SIP_STATUS_CONNECTED &&
      this.state.sipStatus !== SIP_STATUS_REGISTERED
    ) {
      throw new Error(
        `Calling startCall() is not allowed when sip status is ${this.state.sipStatus} (expected ${SIP_STATUS_CONNECTED} or ${SIP_STATUS_REGISTERED})`,
      );
    }

    // if (this.state.callStatus !== CALL_STATUS_IDLE) {
    //   throw new Error(
    //     `Calling startCall() is not allowed when call status is ${this.state.callStatus} (expected ${CALL_STATUS_IDLE})`
    //   );
    // }

    const { iceServers, sessionTimersExpires } = this.props;
    const extraHeaders = this.props.extraHeaders.invite;

    const options: CallOptions = {
      extraHeaders,
      mediaConstraints: { audio: true, video: false },
      rtcOfferConstraints: {
        iceRestart: this.props.iceRestart,
        offerToReceiveAudio: true,
        offerToReceiveVideo: false,
      },
      pcConfig: {
        iceServers,
      },
      sessionTimersExpires,
    };

    if (
      env.callCount &&
      (this.state.sessions?.length || 0) + 1 > env.callCount
    ) {
      toast.warn(
        `You have reached call count limit (limit: ${env.callCount})!`,
      );
      return;
    }

    let isHave = false;
    const num = destination.slice(
      destination.indexOf(":") + 1,
      destination.indexOf("@"),
    );
    this.state.sessions.map((rtcSession) => {
      if (rtcSession?.remote_identity?.uri?.user == num) {
        isHave = true;
      }
    });
    if (!isHave) {
      const session = this.ua?.call(destination, options);

      this.setState({
        ...this.state,
        callStatus: CALL_STATUS_STARTING,
        rtcSession: session,
        sessions: [...this.state.sessions, session],
      });
    } else {
      toast.error(`already has ${num}`);
    }
  };

  public stopCall = () => {
    this.setState({ callStatus: CALL_STATUS_STOPPING });
    this.ua?.terminateSessions();
  };

  public reconfigureDebug() {
    const { debug } = this.props;

    if (debug) {
      JsSIP.debug.enable("JsSIP:*");
      this.logger = console;
    } else {
      JsSIP.debug.disable();
      this.logger = dummyLogger;
    }
  }

  public getNewConnection(): JsSIP.UA {
    let ua: JsSIP.UA;
    const { gatewayUrl, host, user, password, autoRegister } = this.props;

    if (!host || !user) {
      this.setState({
        sipStatus: SIP_STATUS_DISCONNECTED,
        sipErrorType: null,
        sipErrorMessage: null,
      });
      throw new Error("Invalid host or port!");
    }

    try {
      const socket = new JsSIP.WebSocketInterface(gatewayUrl);
      ua = new JsSIP.UA({
        uri: `sip:${user}@${host}`,
        password,
        sockets: [socket],
        register: autoRegister,
        session_timers_force_refresher: true,
        user_agent: "jjk.yuldashov",
        // registrar_server: gatewayUrl,
      });
    } catch (error: any) {
      this.logger.debug("Error", error.message, error);
      this.setState({
        sipStatus: SIP_STATUS_ERROR,
        sipErrorType: SIP_ERROR_TYPE_CONFIGURATION,
        sipErrorMessage: error.message,
      });
      throw new Error(error.message);
    }

    return ua;
  }
  public reinitializeJsSIP() {
    if (this.ua) {
      this.ua.stop();
      this.ua = null;
    }

    const { gatewayUrl, host, user, password, autoRegister } = this.props;

    if (!host || !user) {
      this.setState({
        sipStatus: SIP_STATUS_DISCONNECTED,
        sipErrorType: null,
        sipErrorMessage: null,
        sessions: [],
      });
      return;
    }

    try {
      const socket = new JsSIP.WebSocketInterface(gatewayUrl);
      this.ua = new JsSIP.UA({
        uri: `sip:${user}@${host}`,
        password,
        sockets: [socket],
        register: autoRegister,
        session_timers_force_refresher: true,
        user_agent: "jjk.yuldashov",
      });
    } catch (error: any) {
      this.logger.debug("Error", error.message, error);
      this.setState({
        sipStatus: SIP_STATUS_ERROR,
        sipErrorType: SIP_ERROR_TYPE_CONFIGURATION,
        sipErrorMessage: error.message,
      });
      return;
    }

    const { ua } = this;
    ua.on("connecting", () => {
      this.logger.debug('UA "connecting" event');
      if (this.ua !== ua) {
        return;
      }
      this.setState({
        sipStatus: SIP_STATUS_CONNECTING,
        sipErrorType: null,
        sipErrorMessage: null,
      });
    });

    ua.on("connected", () => {
      this.logger.debug('UA "connected" event');
      if (this.ua !== ua) {
        return;
      }
      this.setState({
        sipStatus: SIP_STATUS_CONNECTED,
        sipErrorType: null,
        sipErrorMessage: null,
      });
    });

    ua.on("disconnected", () => {
      this.logger.debug('UA "disconnected" event');
      if (this.ua !== ua) {
        return;
      }
      this.setState({
        sipStatus: SIP_STATUS_ERROR,
        sipErrorType: SIP_ERROR_TYPE_CONNECTION,
        sipErrorMessage: "disconnected",
      });
    });

    ua.on("registered", (data: any) => {
      this.logger.debug('UA "registered" event', data);
      if (this.ua !== ua) {
        return;
      }
      this.setState({
        sipStatus: SIP_STATUS_REGISTERED,
        callStatus: CALL_STATUS_IDLE,
      });
    });

    ua.on("unregistered", () => {
      this.logger.debug('UA "unregistered" event');
      if (this.ua !== ua) {
        return;
      }
      if (ua.isConnected()) {
        this.setState({
          sipStatus: SIP_STATUS_CONNECTED,
          callStatus: CALL_STATUS_IDLE,
          callDirection: null,
        });
      } else {
        this.setState({
          sipStatus: SIP_STATUS_DISCONNECTED,
          callStatus: CALL_STATUS_IDLE,
          callDirection: null,
        });
      }
    });

    ua.on("registrationFailed", (data: any) => {
      this.logger.debug('UA "registrationFailed" event');
      if (this.ua !== ua) {
        return;
      }
      this.setState({
        sipStatus: SIP_STATUS_ERROR,
        sipErrorType: SIP_ERROR_TYPE_REGISTRATION,
        sipErrorMessage: data,
      });
    });

    ua.on(
      "newRTCSession",
      ({ originator, session: rtcSession, request: rtcRequest }: any) => {
        if (!this || this.ua !== ua) {
          return;
        }
        this.ua;
        // identify call direction
        if (originator === "local") {
          const foundUri = rtcRequest.to.toString();
          const delimiterPosition = foundUri.indexOf(";") || null;
          this.setState({
            callDirection: CALL_DIRECTION_OUTGOING,
            callStatus: CALL_STATUS_STARTING,
            callCounterpart:
              foundUri.substring(0, delimiterPosition) || foundUri,
          });
        } else if (originator === "remote") {
          const foundUri = rtcRequest.from.toString();
          const delimiterPosition = foundUri.indexOf(";") || null;
          this.setState({
            callDirection: CALL_DIRECTION_INCOMING,
            callStatus: CALL_STATUS_STARTING,
            callCounterpart:
              foundUri.substring(0, delimiterPosition) || foundUri,
            sessions: [...this.state.sessions, rtcSession],
          });
        }

        // if (rtcSession.direction === "outgoing") {
        //   let played: any;
        //   rtcSession?.connection?.addEventListener?.(
        //     "addstream",
        //     (event: any) => {
        //       this.remoteAudio.srcObject = event.stream;
        //       played = this.remoteAudio.play(); // Play the received audio
        //       if (typeof played !== "undefined") {
        //         played
        //           .catch(() => {
        //             /**/
        //           })
        //           .then(() => {
        //             setTimeout(() => {
        //               this.remoteAudio.play();
        //             }, 2000);
        //           });
        //         return;
        //       }
        //       setTimeout(() => {
        //         this.remoteAudio.play();
        //       }, 2000);
        //     }
        //   );
        // }

        rtcSession.on("failed", () => {
          if (this.ua !== ua) {
            return;
          }
          setTimeout(() => {
            this.setState({
              sessions: this.state.sessions.filter(
                (e) => e.id != rtcSession.id,
              ),
            });
          }, 10);
        });

        rtcSession.on("ended", () => {
          if (this.ua !== ua) {
            return;
          }
          setTimeout(() => {
            this.setState({
              sessions: this.state.sessions.filter(
                (e) => e.id != rtcSession.id,
              ),
            });
          }, 15);
        });

        rtcSession.on("accepted", () => {
          if (this.ua !== ua) {
            return;
          }
          const foundUri = rtcRequest.from.toString();
          const delimiterPosition = foundUri.indexOf(";") || null;
          setTimeout(() => {
            this.setState({
              ...this.state,
              callDirection: CALL_DIRECTION_OUTGOING,
              callStatus: CALL_STATUS_STARTING,
              callCounterpart:
                foundUri.substring(0, delimiterPosition) || foundUri,
              sessions: this.state.sessions.filter((e) => {
                if (
                  e.id != rtcSession.id &&
                  (e.direction === "outgoing" || e.isEstablished())
                ) {
                  try {
                    e?.terminate?.();
                  } catch (e) {}
                  return false;
                }
                return true;
              }),
              rtcSession: rtcSession,
            });
          }, 5);

          // if (rtcSession.direction === "incoming") {
          //   [this.remoteAudio.srcObject] =
          //     rtcSession.connection.getRemoteStreams();
          //   const played = this.remoteAudio.play();

          //   if (typeof played !== "undefined") {
          //     played
          //       .catch(() => {
          //         /**/
          //       })
          //       .then(() => {
          //         setTimeout(() => {
          //           this.remoteAudio.play();
          //         }, 2000);
          //       });
          //     this.setState({
          //       callStatus: CALL_STATUS_ACTIVE,
          //       sessions: this.state.sessions,
          //     });
          //     return;
          //   }

          //   setTimeout(() => {
          //     this.remoteAudio.play();
          //   }, 2000);
          // }
          this.setState({
            callStatus: CALL_STATUS_ACTIVE,
            sessions: this.state.sessions,
          });
        });

        if (
          this.state.callDirection === CALL_DIRECTION_INCOMING &&
          this.props.autoAnswer
        ) {
          this.logger.log("Answer auto ON");
          this.answerCall();
        } else if (
          this.state.callDirection === CALL_DIRECTION_INCOMING &&
          !this.props.autoAnswer
        ) {
          this.logger.log("Answer auto OFF");
        } else if (this.state.callDirection === CALL_DIRECTION_OUTGOING) {
          this.logger.log("OUTGOING call");
        }
      },
    );

    const extraHeadersRegister = this.props.extraHeaders.register || [];
    if (extraHeadersRegister.length) {
      ua.registrator().setExtraHeaders(extraHeadersRegister);
    }
    ua.start();
  }

  public render() {
    return (this.props as any)?.children;
  }
}
