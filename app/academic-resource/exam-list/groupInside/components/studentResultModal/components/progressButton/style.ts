import styled from "@emotion/styled";
import { Button } from "antd";
import { bgColors } from "styles/theme";

export const Wrapper = styled(Button)<{
  bgColor: string;
  color: string;
}>`
  min-width: 60px !important;
  min-height: 32px !important;
  padding: 4px !important;
  border-radius: 6px !important;
  color: ${bgColors.white};
  cursor: pointer;
  background-color: ${({ bgColor }) => bgColor}!important;
`;
