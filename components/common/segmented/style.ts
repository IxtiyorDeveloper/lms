import styled from "@emotion/styled";
import { Segmented } from "antd";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Container = styled.div`
  width: 100%;
`;
export const Wrapper = styled.div<{ tabPlace: "left" | "right" }>`
  display: flex;
  width: 100%;
  overflow: auto;
  justify-content: space-between;
  flex-direction: ${(props) =>
    props.tabPlace === "left" ? "row" : "row-reverse"};
`;
export const StyledSegment = styled(Segmented)<{
  dark?: boolean;
  width?: string;
}>`
  background: ${({ dark }) => (!dark ? bgColors.wildSand : bgColors.dark)};
  padding: 3px;
  border-radius: 8px;
  font-weight: 700;
  width: ${({ width }) => width ?? "auto"};
  font-size: ${fontSizes.f12};
  line-height: 20px;
  letter-spacing: -0.01em;
  color: ${({ dark }) => (!dark ? textColors.blueGray : textColors.white)};
  height: fit-content;
  &.ant-segmented-block {
    width: 100%;
  }
  .ant-segmented-item-selected {
    background: ${({ dark }) => (!dark ? bgColors.primary : bgColors.grayDark)};
    box-shadow: ${({ dark }) =>
      !dark
        ? "0 4px 8px -4px rgba(0, 0, 0, 0.25),inset 0 -1px 1px rgba(0, 0, 0, 0.04),inset 0 2px 0 rgba(255, 179, 35, 0.2)"
        : "none"};
    border-radius: 6px;
  }

  .ant-segmented-item:hover {
    color: ${({ dark }) =>
      !dark ? bgColors.blueGray : bgColors.white} !important;
  }

  .ant-segmented-item-selected {
    color: ${({ dark }) =>
      !dark ? bgColors.blueGray : bgColors.white} !important;
  }

  .ant-segmented-thumb {
    background: ${({ dark }) => (!dark ? bgColors.primary : bgColors.grayDark)};
    box-shadow: ${({ dark }) =>
      !dark
        ? "0 4px 8px -4px rgba(0, 0, 0, 0.25),inset 0 -1px 1px rgba(0, 0, 0, 0.04),inset 0 2px 0 rgba(255, 179, 35, 0.2)"
        : "none"};
    border-radius: 6px;
  }

  .ant-segmented-item-label {
    display: flex !important;
    align-items: center !important;
    justify-content: center;
    .ant-segmented-item-icon {
      display: flex !important;
    }
  }
`;
