import styled from "@emotion/styled";
import { bgColors } from "styles/theme";
import { TIcon } from "types";
import { css } from "@emotion/react";

export const Wrapper = styled.div<{
  size: TIcon["size"];
  clicked: boolean;
  count: number;
}>`
  width: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  height: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid
    ${(props) => (props.count > 0 ? bgColors.sunny : bgColors.purpleCrystal)};
  background: ${(props) =>
    props.count > 0 ? bgColors.daisy : bgColors.brilliance};
  position: relative;

  .ant-badge {
    position: absolute;
    top: 0;
    right: -3px;
  }

  &:hover {
    background: ${bgColors.primary};
    border-color: ${bgColors.primary};
  }
`;
