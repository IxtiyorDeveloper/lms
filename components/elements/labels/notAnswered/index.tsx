import React, { FC } from "react";
import { Container, Wrapper } from "./style";
import { TIcon } from "types";
import { NotRespondedSvg } from "components/index";
import { LabelWrapper } from "../callRequest/style";
import { userFullNameCreator } from "utils/userFullNameCreator";
import { Tooltip } from "antd";

const Index: FC<TIcon> = ({
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
      destroyTooltipOnHide>
      <Container>
        <Wrapper
          clicked={!!isOpen}
          onClick={() => onClick && onClick()}
          size={size}>
          <NotRespondedSvg width={s} height={s} />
        </Wrapper>
        {isOpen && label && <LabelWrapper size={size}>{label}</LabelWrapper>}
      </Container>
    </Tooltip>
  );
};

export default Index;
