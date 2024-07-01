import React, { FC } from "react";
import { Wrapper } from "./style";
import {
  CopySvg,
  InCallSvg,
  MaximizeCall,
  MinimizeScreenSvg,
  OutCallSvg,
} from "components";
import { bgColors } from "styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { changeSipUi, IStore } from "store";
import { toast } from "react-toastify";
import { formatIpPhone } from "utils/phoneNumberFormatter";

const CallHeader: FC<{
  text?: string;
  isBig?: boolean;
  phone?: string;
  call?: any;
  onChangeSize?: (e: boolean) => void;
}> = ({ text, onChangeSize, isBig, call, phone }) => {
  const dispatch = useDispatch();
  const bool = useSelector((state: IStore) => {
    return (
      (state.sip.sip.ref?.state?.sipStatus === "sipStatus/REGISTERED" ||
        state.sip.sip.ref?.state?.sipStatus === "sipStatus/CONNECTING") &&
      state.sip.sip.ref?.state?.callStatus === "callStatus/IDLE"
    );
  });
  const { isMinimized } = useSelector((state: IStore) => state.ui.sip);

  const is = isBig !== undefined ? !isBig : !isMinimized;
  const isIncoming = text == "incoming";

  const copyToClipboard = (phone: string | 0) => {
    if (!!phone)
      navigator.clipboard
        .writeText(phone)
        .then(() => {
          toast.info("Copied to clipboard");
        })
        .catch((err) => {
          toast.error(err.message);
        });
  };
  return (
    <Wrapper>
      <div className="action">
        {isIncoming ? (
          <InCallSvg width={12} height={12} color={bgColors.midori} />
        ) : (
          <OutCallSvg width={12} height={12} color={bgColors.midori} />
        )}
        <p className={!isBig && call.isTalking ? "talk" : ""}>
          {!isBig && call.isTalking == "talk"
            ? call.status
            : isIncoming
              ? "Incall"
              : "Outcall"}
        </p>
      </div>
      {!isBig && (
        <div className="phone-number">
          <p>{phone}</p>
          <CopySvg
            onClick={() =>
              copyToClipboard(formatIpPhone(phone?.replaceAll(" ", "") || ""))
            }
            width={12}
            height={12}
            color={bgColors.soulfulBlue}
          />
        </div>
      )}
      <div className="flex">
        <div
          onClick={() => {
            if (!bool) {
              onChangeSize
                ? onChangeSize(!isBig)
                : dispatch(changeSipUi({ isMinimized: !isMinimized }));
            }
          }}
        >
          {!is ? (
            <MinimizeScreenSvg
              color={bool ? bgColors.yourShadow : bgColors.white}
            />
          ) : (
            <MaximizeCall color={bool ? bgColors.yourShadow : bgColors.white} />
          )}
        </div>
        {/* <CallXIcon
          color={bool ? bgColors.pop : bgColors.yourShadow}
          onClick={() => bool && onClose()}
        /> */}
      </div>
    </Wrapper>
  );
};

export default CallHeader;
