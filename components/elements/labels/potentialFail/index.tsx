import React, { FC, useMemo } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { PotentialFailSvg } from "components";
import { LabelWrapper } from "../callRequest/style";
import { Tooltip } from "antd";
import { Container } from "../willPay/style";
import { userFullNameCreator } from "utils/userFullNameCreator";
import { bgColors } from "styles/theme";

const PotentialFail: FC<TIcon> = ({
  size,
  isOpen,
  label,
  onClick,
  defaultValue,
  disabled,
}) => {
  const s = useMemo(
    () => (size === "small" ? " 18" : size === "medium" ? "22" : ""),
    [size]
  );
  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };
  return (
    <Tooltip
      destroyTooltipOnHide
      placement="topLeft"
      title={
        defaultValue?.createdBy && (
          <div>
            <p>
              Created by: {userFullNameCreator(defaultValue?.createdBy) ?? "-"}
            </p>
            <p>{defaultValue?.note}</p>
          </div>
        )
      }
    >
      <Container size={size}>
        <Wrapper
          clicked={!!isOpen}
          onClick={() => handleClick()}
          size={size}
          disabled={disabled}
        >
          <PotentialFailSvg
            height={s}
            width={18}
            color={
              !!isOpen
                ? bgColors.white
                : disabled
                ? bgColors.yourShadow
                : bgColors.soulfulBlue
            }
            secondColor={
              !!isOpen
                ? bgColors.white
                : disabled
                ? bgColors.yourShadow
                : bgColors.soulfulBlue
            }
          />
        </Wrapper>
        {isOpen && label && <LabelWrapper size={size}>{label}</LabelWrapper>}
      </Container>
    </Tooltip>
  );
};

export default PotentialFail;
