import React, { MutableRefObject } from "react";

export const SipProviderContext =
  React.createContext<MutableRefObject<any> | null>(null);
export const useSip: any = () => {
  const ref = React.useContext(SipProviderContext);
  if (ref === null) {
    throw new Error("useSip must be used within a SipProviderContext");
  }
  return ref;
};
