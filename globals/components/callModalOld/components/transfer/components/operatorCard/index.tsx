import React from "react";
import { ICallOperator, ICallStaff } from "types";
import { Wrapper } from "./style";
import { CircleImage, TransferShadowSvg } from "components";
import { bgColors } from "styles/theme";
import { useSelector } from "react-redux";
import { IStore } from "store";

const OperatorCard = ({ user }: { user: ICallOperator }) => {
  const ref = useSelector((state: IStore) => state.sip.sip.rtcSession);
  const connectionConfig = useSelector(
    (state: IStore) => state.sip.connectionConfig
  );
  const refer = () => {
    ref?.refer(`sip:${user.operator_number}@${connectionConfig?.server}`);
  };
  return (
    <Wrapper>
      <div>
        <CircleImage width={60} height={60} src={user.avatar_url} />
      </div>
      <div>
        <div>{`${user.firstname} ${user.lastname}`}</div>
        <div>Operator</div>
      </div>
      <div className="third" onClick={refer}>
        <TransferShadowSvg color={bgColors.white} />
      </div>
    </Wrapper>
  );
};

export default OperatorCard;
