import styled from "@emotion/styled";
import { bgColors } from "styles/theme";
import { TIcon } from "types";

export const Wrapper = styled.div<{ size: TIcon["size"]; clicked: boolean }>`
  position: relative;
  width: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  height: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  background: ${(props) =>
    props.clicked ? bgColors.transparentGreen : bgColors.brilliance};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden !important;
  border: 1px solid
    ${(props) =>
      props.clicked ? bgColors.transparentGreen : bgColors.purpleCrystal};

  &:hover {
    background: ${bgColors.transparentGreen};
    border-color: ${bgColors.transparentGreen};
  }
`;
export const WillPayWrapper = styled.div<{ size: TIcon["size"] }>`
  position: relative;
  width: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  height: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  overflow: hidden;
  cursor: pointer;
  .abs {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
`;
export const Container = styled.div<{ size: TIcon["size"]; bigger?: boolean }>`
  position: relative;
  width: ${(props) => (props.bigger ? "40px" : props.size ? "38px" : "30px")};
  cursor: pointer !important;
  display: flex;
  justify-content: center;
  .abs {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
`;
