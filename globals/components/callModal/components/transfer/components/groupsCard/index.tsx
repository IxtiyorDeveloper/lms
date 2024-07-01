import React from "react";
import { ICallGroup } from "types";
import { Wrapper } from "./style";
import { CircleImage, TransferShadowSvg } from "components";
import { bgColors } from "styles/theme";
import { useSelector } from "react-redux";
import { IStore } from "store";

const GroupCard = ({ group }: { group: ICallGroup }) => {
  const ref = useSelector((state: IStore) => state.sip.sip.rtcSession);
  const connectionConfig = useSelector(
    (state: IStore) => state.sip.connectionConfig
  );
  const refer = () => {
    ref.refer(`sip:${group.num}@${connectionConfig?.server}`);
  };
  return (
    <Wrapper>
      <div>
        <CircleImage width={60} height={60} />
      </div>
      <div>
        <div>{`${group.name || "-"}`}</div>
        <div>{`${group.num}`}</div>
        <div>Group</div>
      </div>
      <div className="third" onClick={refer}>
        <TransferShadowSvg color={bgColors.white} />
      </div>
    </Wrapper>
  );
};

export default GroupCard;
