import styled from "@emotion/styled";
import { bgColors } from "styles/theme";
import { TIcon } from "types";
import { css } from "@emotion/react";

export const Wrapper = styled.div<{
  size: TIcon["size"];
  clicked: boolean;
  disabled?: boolean;
}>`
  width: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  height: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  background: ${(props) =>
    props.clicked
      ? bgColors.primary
      : props?.disabled
      ? bgColors.purpleCrystal
      : bgColors.brilliance};
  border: 1px solid
    ${(props) =>
      props.clicked
        ? bgColors.primary
        : props?.disabled
        ? "none"
        : bgColors.purpleCrystal};
  opacity: ${(props) => (props?.disabled ? 0.4 : 1)};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        background: ${bgColors.primary};
        border-color: ${bgColors.primary};
      }
    `}
`;
