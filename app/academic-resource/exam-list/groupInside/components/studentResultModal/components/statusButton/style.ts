import styled from "@emotion/styled";
import { Button } from "antd";
import { textColors } from "styles/theme";

export const Wrapper = styled(Button)<{
  bgColor: string;
}>`
  min-width: 42px !important;
  height: 24px;
  padding: 4px !important;
  border-radius: 6px !important;
  color: ${textColors.white};
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  text-align: center;
  background-color: ${({ bgColor }) => bgColor}!important;
`;
