import { SipChannelName } from "constants/tokenNames";

export const startCall = (phoneNumber: string) => {
  const channel = new BroadcastChannel(SipChannelName);
  channel.postMessage(phoneNumber);
  channel.close();
};
