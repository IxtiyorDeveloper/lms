import React from "react";
import dynamic from "next/dynamic";

const Sip = dynamic(() => import("app/sip/[phoneNumber]"));

const SipPage = () => {
  return <Sip />;
};

export default SipPage;
