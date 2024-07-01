import React, { useState } from "react";
import { LittlePhoneSvg, TickSvg } from "components";
import { IUserPhone } from "types/userPhone";
import formatPhoneNumber, { formatIpPhone } from "utils/phoneNumberFormatter";
import {
  PhoneWrapper,
  Tick,
} from "app/groups/[groupId]/components/administrativeTab/style";
import { bgColors } from "styles/theme";
import { Popover } from "antd";
import { usePageDataMemo } from "hooks";
import { PhoneContainer } from "../../../common/tableCells/style";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { MainPhone } from "constants/phoneTypes";

const Call = (
  props: {
    value?: IUserPhone[];
    style?: React.CSSProperties;
  } & TIcon
) => {
  const s =
    props.size === "small" ? " 17.37" : props.size === "medium" ? "24" : "";
  const [open, setValue] = useState(false);
  const selects = usePageDataMemo();
  const isValue = props.value && props.value?.length;

  const content = () => {
    return (
      <PhoneContainer>
        {props?.value?.map((item, index) => {
          return (
            <PhoneWrapper
              key={index}
              style={props.style}
              onClick={() => props.onClick?.(formatIpPhone(item.phone_number))}
            >
              <p className="text" style={props.style}>
                {selects.phone
                  ? selects?.phone?.find(
                      (type) => type.value === `${item?.type}`
                    )?.label
                  : ""}
              </p>
              <div className="phone" style={props.style}>
                {!!item.is_confirmed ? (
                  <Tick>
                    <TickSvg color={bgColors.white} />
                  </Tick>
                ) : (
                  <LittlePhoneSvg />
                )}
                <span style={props.style}>
                  {formatPhoneNumber(item.phone_number)}
                </span>
              </div>
            </PhoneWrapper>
          );
        })}
      </PhoneContainer>
    );
  };

  const handleChange = (newValue: boolean) => {
    if (isValue) {
      setValue(newValue);
    }
  };

  return (
    <Popover
      destroyTooltipOnHide
      content={isValue ? content : null}
      placement="left"
      open={open}
      onOpenChange={handleChange}
    >
      <Wrapper
        size={props.size}
        clicked={false}
        onClick={() =>
          props.onClick?.(
            formatIpPhone(
              props?.value?.find((e) => e.type == MainPhone)?.phone_number ||
                props?.value?.[0]?.phone_number ||
                ""
            )
          )
        }
      >
        <LittlePhoneSvg width={s} height={s} />
      </Wrapper>
    </Popover>
  );
};

export default Call;
