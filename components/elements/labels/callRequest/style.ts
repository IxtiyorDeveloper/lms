import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { TIcon } from "types";
import { DatePicker } from "antd";

export const Wrapper = styled.div<{ clicked: boolean; size: TIcon["size"] }>`
  width: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  height: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  background: ${(props) =>
    props.clicked ? bgColors.periwinkle : bgColors.brilliance};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid
    ${(props) => (props.clicked ? bgColors.periwinkle : bgColors.purpleCrystal)};

  &:hover {
    background: ${bgColors.periwinkle};
    border-color: ${bgColors.periwinkle};
  }

  position: relative;
  .abs {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
`;

export const LabelWrapper = styled.span<{ size: TIcon["size"] }>`
  font-weight: 600;
  font-size: ${fontSizes.f8};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
  text-align: center;
  margin-top: 2px;
  position: absolute;
  top: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  font-style: italic;
  white-space: nowrap;
`;

export const AntDatePicker = styled(DatePicker)`
  //position: absolute;
  //top: 18px;
  //left: 8px;
  //padding: 0 !important;
  border: none;

  & .ant-picker-input {
    visibility: hidden !important;
    display: none !important;
  }
`;
