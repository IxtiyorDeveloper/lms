import React, { FC } from "react";
import { Container, Wrapper } from "./style";
import { TIcon } from "types";
import { LabelWrapper } from "../callRequest/style";
import { userFullNameCreator } from "utils/userFullNameCreator";
import { Tooltip } from "antd";
import { CheckedSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "../../../../styles/theme";

const CheckedLabel: FC<TIcon> = ({
  size,
  defaultValue,
  label,
  isOpen,
  onClick,
  createdBy,
}) => {
  const s = size === "small" ? " 17.37" : size === "medium" ? "22" : "";
  return (
    <Tooltip
      title={createdBy || userFullNameCreator(defaultValue?.createdBy)}
      trigger="hover"
      destroyTooltipOnHide
    >
      <Container>
        <Wrapper
          clicked={!!isOpen}
          onClick={() => onClick && onClick()}
          size={size}
        >
          <CheckedSvg width={s} height={+s / 2} color={bgColors.blueGray} />
        </Wrapper>
        {isOpen && label && <LabelWrapper size={size}>{label}</LabelWrapper>}
      </Container>
    </Tooltip>
  );
};

export default CheckedLabel;
