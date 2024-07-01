import styled from "@emotion/styled";
import { bgColors, borders } from "styles/theme";
import { TIcon } from "types";

export const Wrapper = styled.div<{ size: TIcon["size"] }>`
  width: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  height: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  background: ${bgColors.white};
  border: 1px solid ${bgColors.purpleCrystal};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: ${bgColors.purpleCrystal};
    border-color: ${bgColors.purpleCrystal};
  }
`;
