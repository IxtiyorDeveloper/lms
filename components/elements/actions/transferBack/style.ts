import styled from "@emotion/styled";
import { bgColors } from "styles/theme";
import { TIcon } from "types";

export const Wrapper = styled.div<{ size: TIcon["size"] }>`
  width: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  height: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  background: ${bgColors.orange};
  border-radius: 50%;
  display: flex;
  justify-content: center !important;
  align-items: center !important;
  cursor: pointer;
  &:hover {
    background: ${bgColors.tomato};
  }
`;
