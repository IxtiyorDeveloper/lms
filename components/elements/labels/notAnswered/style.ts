import styled from "@emotion/styled";
import { bgColors } from "styles/theme";
import { TIcon } from "types";
import { css } from "@emotion/react";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
export const Wrapper = styled.div<{ size: TIcon["size"]; clicked: boolean }>`
  width: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  height: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  background: ${(props) =>
    props.clicked ? bgColors.pale : bgColors.brilliance};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid
    ${(props) => (props.clicked ? bgColors.pale : bgColors.purpleCrystal)};
  ${({ clicked }) =>
    clicked &&
    css`
      path {
        stroke: ${bgColors.pop};
      }
    `}
  &:hover {
    background: ${bgColors.pale};
    border-color: ${bgColors.pale};
    path {
      stroke: ${bgColors.pop};
    }
  }
`;
