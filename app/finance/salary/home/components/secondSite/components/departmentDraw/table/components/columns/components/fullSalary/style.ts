import styled from "@emotion/styled";
import { fontSizes, textColors, borders } from "styles/theme";

export const Equality = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  gap: 10px;
  width: 23px;
  height: 23px;
  background: #f4f5f6;
  border-radius: 4px;
  cursor: pointer;
`;
export const Wrapper = styled.div`
  .custom-popover {
    .ant-popover-inner {
      background-color: black !important;
    }

    .ant-popover-title {
      color: rebeccapurple !important;
    }
  }

  display: flex;
  gap: 5px;
`;
export const SalaryWrapper = styled.div<{
  shadow?: string;
  textColor?: string;
  cursorPointer?: boolean;
}>`
  cursor: pointer;
  font-weight: 700;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  text-align: center;
  letter-spacing: -0.01em;
  color: ${(props) =>
    props.textColor ? props.textColor : textColors.brilliance};
  background-color: ${(props) => props.color};
  padding: 4px 6px;
  width: fit-content;
  border-radius: ${borders.b4};
  display: flex;
  justify-content: center;
  box-shadow: ${(props) => (props.shadow ? props.shadow : "unset")};
  ${(props) => (!!props.cursorPointer ? "cursor:pointer" : "")}
`;
export const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  gap: 10px;
  width: 23px;
  height: 23px;
  background: #f4f5f6;
  border-radius: 4px;
  cursor: pointer;
`;
