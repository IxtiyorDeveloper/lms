import React, { FC, useMemo } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { LabelWrapper } from "../callRequest/style";
import { Tooltip } from "antd";
import { Container } from "../willPay/style";
import { userFullNameCreator } from "utils/userFullNameCreator";
import { bgColors } from "styles/theme";
import { MotSvg } from "@jasurbekyuldashov/lms-web-icons";
import moment from "moment";
import { DATE_FORMAT_DD_MMM__YYYY_HH_mm } from "constants/dates";

const DontTakeMot: FC<TIcon> = ({
  size,
  isOpen,
  label,
  onClick,
  defaultValue,
  disabled,
}) => {
  const s = useMemo(
    () => (size === "small" ? " 18" : size === "medium" ? "22" : ""),
    [size],
  );
  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  return (
    <Tooltip
      // destroyTooltipOnHide
      placement="topLeft"
      title={
        defaultValue?.createdBy && (
          <div>
            <p>
              Created by: {userFullNameCreator(defaultValue?.createdBy) ?? "-"}
            </p>
            <p>{defaultValue?.note}</p>
            <p>
              Date:{" "}
              {moment(defaultValue?.datetime).format(
                DATE_FORMAT_DD_MMM__YYYY_HH_mm,
              )}
            </p>
          </div>
        )
      }
    >
      <Container size={size} className="dont_take_mot_label">
        <Wrapper
          clicked={!!isOpen}
          onClick={() => handleClick()}
          size={size}
          disabled={disabled}
        >
          <MotSvg
            // height={s}
            // width={18}
            color={
              !!isOpen
                ? bgColors.rose
                : disabled
                  ? bgColors.yourShadow
                  : bgColors.black
            }
            bgColor={!!isOpen ? bgColors.pale : bgColors.white}
          />
        </Wrapper>
        {isOpen && label && <LabelWrapper size={size}>{label}</LabelWrapper>}
      </Container>
    </Tooltip>
  );
};

export default DontTakeMot;
