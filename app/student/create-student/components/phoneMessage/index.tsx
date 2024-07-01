import React, { FC } from "react";
import { Wrapper } from "./style";
import {
  PHONE_TYPE_LEAD,
  PHONE_TYPE_NEW_CONTACT,
  PHONE_TYPE_STUDENT_UNCONFIRMED,
} from "constants/phoneNumberValidationEnums";
import { CanNotAddSvg, CircleSuccessSvg, HaveButCanAddSvg } from "components";
import formatPhoneNumber from "utils/phoneNumberFormatter";
import { PhoneTypes } from "constants/phoneTypes";

interface IProps {
  error: any;
}
const PhoneMessage: FC<IProps> = ({ error }) => {
  const type =
    error?.type == PHONE_TYPE_LEAD || error?.type == PHONE_TYPE_NEW_CONTACT
      ? 1
      : error?.type == PHONE_TYPE_STUDENT_UNCONFIRMED
      ? 2
      : 3;
  const phoneType = PhoneTypes?.[error?.phone_type as keyof typeof PhoneTypes];
  return (
    <Wrapper type={type}>
      {error?.message && (
        <div className="from">
          <div>
            {type == 1 ? (
              <CircleSuccessSvg width={30} height={30} />
            ) : type === 2 ? (
              <HaveButCanAddSvg />
            ) : (
              <CanNotAddSvg />
            )}
          </div>
          <div className="info">
            <div>
              <span>
                {`+998 ${formatPhoneNumber(error?.phone_number.slice(1))}`}
              </span>
              {phoneType && <span>{` (${phoneType})`}</span>}
            </div>
            <div
              className="desc"
              dangerouslySetInnerHTML={{
                __html: error?.message,
              }}
            />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default PhoneMessage;
