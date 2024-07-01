import React, { FC } from "react";
import { Wrapper } from "./style";
import PhoneInput from "./components/phoneInput";
import CallStatus from "./components/callStatus";
import CallActions from "./components/callActions";

interface IProps {
  control: any;
  phoneName: string;
  onComplete?: (value?: string) => void;
  isDisabled?: boolean;
  isActiveHistory?: boolean;
  isActiveMute?: boolean;
  isActiveTransfer?: boolean;
  status?: string;
  changeCall: (obj: { [key: string]: any }) => void;
  onClickLittle?: () => void;
}
const PhoneContainer: FC<IProps> = ({
  control,
  phoneName,
  onComplete,
  isDisabled = true,
  isActiveHistory = false,
  isActiveMute = false,
  isActiveTransfer = false,
  status,
  changeCall,
  onClickLittle,
}) => {
  return (
    <Wrapper>
      <PhoneInput
        control={control}
        name={phoneName}
        onComplete={onComplete}
        onClickLittle={onClickLittle}
      />
      <CallStatus status={status} isAccepted={!isDisabled} />
      <CallActions
        disabled={isDisabled}
        isActiveHistory={isActiveHistory}
        isActiveMute={isActiveMute}
        isActiveTransfer={isActiveTransfer}
        changeCall={changeCall}
      />
    </Wrapper>
  );
};

export default PhoneContainer;
