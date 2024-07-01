import React, { FC } from "react";
import { Wrapper } from "./style";
import { useCallHistory } from "hooks/useCall";
import { Spin } from "antd";
import HistoryCard from "./components/historyCard";
import { InCallSvg, IncomingCallSvg, NotAnswerCallSvg } from "components";
import { bgColors } from "styles/theme";
import { useSelector } from "react-redux";
import { IStore } from "store";
import { EnumCallStatus, EnumCallDirection } from "constants/call";

const background = {
  call_missed: {
    icon: <NotAnswerCallSvg />,
    color: bgColors.pop,
  },
  inbound: {
    icon: <IncomingCallSvg width={24} height={24} />,
    color: bgColors.deep,
  },
  outbound: {
    icon: <InCallSvg width={24} height={24} />,
    color: bgColors.midori,
  },
};

const TransferCall: FC<{ rtcSession: any }> = ({ rtcSession }) => {
  const sip = useSelector((store: IStore) => store.sip);

  const getNumber = (sip: any) => {
    const sipUri = rtcSession?.remote_identity?.uri?.user || "";
    // @ts-ignore
    const phoneNumber = sipUri && sipUri.match(/\d+/)[0];
    return `+998 ${phoneNumber.substr(0, 2)} ${phoneNumber.substr(
      2,
      3,
    )} ${phoneNumber.substr(5, 2)} ${phoneNumber.substr(
      7,
      2,
    )} ${phoneNumber.substr(10, 2)}`;
  };

  const { data, isLoading } = useCallHistory({
    query_params: { phone_number: getNumber(sip?.sip), expand: "data" },
    enabled: true,
  });

  return (
    <Wrapper>
      <Spin spinning={isLoading}>
        <div className="staff_container">
          {data &&
            data.map((e, index) => {
              let a: { icon: any; color: string } = background.outbound;

              if (e?.event === EnumCallStatus.CALL_MISSED) {
                a = background.call_missed;
              } else if (
                e?.direction === EnumCallDirection.DIRECTION_OUTBOUND
              ) {
                a = background.outbound;
              } else {
                a = background.inbound;
              }
              return (
                <HistoryCard
                  data={e}
                  background={a.color}
                  Icon={a.icon}
                  key={index}
                />
              );
            })}
        </div>
      </Spin>
    </Wrapper>
  );
};

export default TransferCall;
