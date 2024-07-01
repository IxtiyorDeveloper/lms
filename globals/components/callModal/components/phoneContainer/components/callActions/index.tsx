import React, { FC } from "react";
import { Item, Wrapper } from "./style";
import { ActivitySvg, MicrophoneSvg, TransferShadowSvg } from "components";
import { bgColors, textColors } from "styles/theme";
import { useSelector } from "react-redux";
import { IStore } from "store";
import { toast } from "react-toastify";

interface IProps {
  isActiveHistory: boolean;
  isActiveMute: boolean;
  isActiveTransfer: boolean;
  disabled: boolean;
  changeCall: (obj: { [key: string]: any }) => void;
}

const CallActions: FC<IProps> = ({
  disabled,
  isActiveTransfer,
  isActiveHistory,
  isActiveMute,
  changeCall,
}) => {
  const ref = useSelector((state: IStore) => state.sip.sip.rtcSession);
  const handleMute = () => {
    if (!disabled) {
      changeCall({
        isActiveMute: !isActiveMute,
      });
      try {
        if (!isActiveMute) {
          ref.mute();
        } else {
          ref.unmute();
        }
      } catch (e) {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <Wrapper>
      <Item
        disabled={disabled}
        activeColor={bgColors.friedEgg}
        activeTextColor={textColors.blackFire}
        isActive={isActiveHistory}
        shadow={`inset 0 0 20px ${bgColors.sunny}`}
        onClick={() => {
          !disabled &&
            changeCall({
              isActiveHistory: !isActiveHistory,
              isActiveTransfer: !isActiveHistory ? isActiveHistory : false,
            });
        }}
      >
        <ActivitySvg
          color={
            isActiveHistory
              ? bgColors.blackFire
              : disabled
              ? bgColors.sceptreBlue
              : bgColors.brotherBlue
          }
        />
      </Item>
      <Item
        disabled={disabled}
        activeColor={bgColors.pepper}
        activeTextColor={textColors.brilliance}
        shadow={`inset 0 0 20px ${bgColors.pop}`}
        isActive={isActiveMute}
        onClick={handleMute}
      >
        <MicrophoneSvg
          color={
            isActiveMute
              ? bgColors.brilliance
              : disabled
              ? bgColors.sceptreBlue
              : bgColors.brotherBlue
          }
        />
      </Item>
      <Item
        disabled={disabled}
        activeColor={bgColors.kitten}
        activeTextColor={textColors.brilliance}
        isActive={isActiveTransfer}
        shadow={`inset 0 0 20px ${bgColors.deep}`}
        onClick={() => {
          !disabled &&
            changeCall({
              isActiveTransfer: !isActiveTransfer,
              isActiveHistory: !isActiveTransfer ? isActiveTransfer : false,
            });
        }}
      >
        <TransferShadowSvg
          color={
            isActiveTransfer
              ? bgColors.brilliance
              : disabled
              ? bgColors.sceptreBlue
              : bgColors.brotherBlue
          }
        />
      </Item>
    </Wrapper>
  );
};

export default CallActions;
