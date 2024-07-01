import styled from "@emotion/styled";
import { bgColors } from "styles/theme";
import { TIcon } from "types";

export const Wrapper = styled.div<{ size: TIcon["size"]; clicked: boolean }>`
  width: ${(props) => (props.size === "medium" ? "68px" : "30px")};
  height: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  background: ${(props) =>
    props.clicked ? bgColors.purpleCrystal : bgColors.brilliance};
  border: 1px solid
    ${(props) =>
      props.clicked ? bgColors.purpleCrystal : bgColors.purpleCrystal};
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: ${bgColors.purpleCrystal};
    border-color: ${bgColors.purpleCrystal};
  }
`;
