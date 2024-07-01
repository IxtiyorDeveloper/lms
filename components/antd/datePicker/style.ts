import styled from "@emotion/styled";
import {bgColors, fontSizes, textColors} from "styles/theme";
import { DatePicker } from "antd";
export const Wrapper = styled.div`
  width: 100%;
`;
export const StyledDatePicker = styled(DatePicker)`
  border: 1px solid ${bgColors.purpleCrystal};
  border-radius: 6px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05) !important;
  background: ${bgColors.yukon};

  &:active,
  &:hover {
    border-color: ${bgColors.primary};
  }

  &.ant-picker-focused {
    border-color: ${bgColors.primary} !important;
    outline-color: ${bgColors.primary} !important;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05) !important;
  }

  .label {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 2;
    letter-spacing: -0.01em;
    color: ${textColors.onyx};
  }
`;
