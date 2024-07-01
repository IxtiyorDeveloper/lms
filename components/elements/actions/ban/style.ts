import styled from "@emotion/styled";
import { bgColors } from "styles/theme";
import { TIcon } from "types";

export const Wrapper = styled.div<{ size: TIcon["size"] }>`
  width: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  height: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  background: ${bgColors.pop};
  border-radius: 50%;
  display: flex;
  justify-content: center !important;
  align-items: center !important;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2),
    inset 4px 0 4px rgba(253, 136, 143, 0.7),
    inset -4px 0 4px rgba(253, 136, 143, 0.7);
  &:hover {
    background: ${bgColors.rose};
  }
  .svg-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
