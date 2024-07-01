import styled from "@emotion/styled";
import { bgColors } from "styles/theme";
import { TIcon } from "types";

export const Wrapper = styled.div<{ size: TIcon["size"]; clicked: boolean }>`
  width: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  height: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${bgColors.deep};

  &:hover {
    background: ${bgColors.adamantine};
    border-color: ${bgColors.adamantine};
  }
`;
