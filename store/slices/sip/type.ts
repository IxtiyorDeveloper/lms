import {
  CallDirection,
  CallStatus,
  SipErrorType,
  SipStatus,
} from "react-jssip-wrapper";
import { IProps } from "globals/components/callModal/components/userCard";

export interface ISipStore {
  sip: {
    startCall(arg0: string): unknown;
    sipStatus: SipStatus;
    sipErrorType: SipErrorType;
    sipErrorMessage: string;
    rtcSession: any;
    sessions: any[];
    callStatus: CallStatus;
    callDirection: CallDirection | null;
    callCounterpart: string;
    ref: {
      state: {
        sipStatus: SipStatus;
        sipErrorType: SipErrorType;
        sipErrorMessage: string;
        rtcSession: any;
        callStatus: CallStatus;
        callDirection: CallDirection | null;
        callCounterpart: string;
      };
    } & any;
  };
  isMuted: boolean;
  measurement: {
    width: number;
    height: number;
  };
  users: IProps["user"][];
  connectionConfig: {
    server: string;
    password: string;
    user: string;
  } | null;
}
