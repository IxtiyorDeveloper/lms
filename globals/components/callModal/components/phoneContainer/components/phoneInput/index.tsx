import React, { FC } from "react";
import { CopySvg, PhoneNumberInput } from "components";
import { Wrapper } from "./style";
import { bgColors } from "styles/theme";
import { useSelector } from "react-redux";
import { IStore } from "store";
import { toast } from "react-toastify";
import { formatIpPhone } from "utils/phoneNumberFormatter";
import { useWatch } from "react-hook-form";

interface IProps {
  control: any;
  name: any;
  onComplete?: (value?: string) => void;
  onClickLittle?: () => void;
}

const PhoneInput: FC<IProps> = ({ control, name, onComplete }) => {
  // const sip = useSelector((state: IStore) => !!state.sip.sip.callDirection);

  const phone = useWatch({ control, name });

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
      <PhoneNumberInput
        onComplete={!!onComplete ? onComplete : () => ({})}
        control={control}
        name={name}
        disabled={sip}
        autoFocus
      />
      <CopySvg
        className="svg"
        bgColor={bgColors.yourShadow}
        width={20}
        height={20}
        onClick={() =>
          copyToClipboard(formatIpPhone(phone?.replaceAll(" ", "") || ""))
        }
      />
    </Wrapper>
  );
};

export default PhoneInput;
