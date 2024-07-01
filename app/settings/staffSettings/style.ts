import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";
import { HexToRgbA } from "utils/hexToRgba";

export const Wrapper = styled.div`
  margin: 10px 40px;
`;

export const TabHeader = styled.div<{ isActive?: boolean; color: string }>`
  text-align: center;
  width: 100%;
  z-index: 4;
  height: 100%;
  padding: 11px 0 11px 14px;
  border-radius: 6px;
  font-weight: 600;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: ${(props) =>
    props.isActive ? props.color : HexToRgbA(props.color, 0.3)};
  color: ${(props) =>
    props.color === bgColors.primary ? textColors.blueGray : textColors.white};
`;

export const containerStyles = {
  borderRadius: "8px",
  overflow: "hidden",
  backgroundColor: bgColors.white,
};
