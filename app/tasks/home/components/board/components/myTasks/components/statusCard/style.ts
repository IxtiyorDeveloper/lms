import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const StatusCardWrapper = styled.div`
  min-width: 290px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
`;

export const CardHeader = styled.div<{ color: string }>`
  position: sticky;
  top: 0;
  background: ${(props) => props.color};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 12px 12px 0 0;
  .title {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${textColors.white};
  }

  .process {
    & .ant-switch {
      background-color: ${bgColors.white}30;
    }

    & .ant-switch:hover {
      background-color: ${bgColors.white}50;
    }

    & .ant-switch .ant-switch-handle::before {
      background-color: ${bgColors.white};
    }

    display: flex;
    align-items: center;
    gap: 1px;
  }

  .title > p {
    color: ${textColors.white};
    font-size: ${fontSizes.f16};
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }

  .title > span {
    display: inline-block;
    padding: 0 8px;
    border-radius: 40px;
    text-align: center;
    background: ${bgColors.white};
    color: ${(props) => props.color};
    font-size: ${fontSizes.f14};
    font-weight: 700;
  }
`;

export const CardBody = styled.div`
  padding: 20px 10px 4px 10px;
  background: ${bgColors.wildSand};
  height: 150vh;
  overflow-y: auto;
  .loading-state {
    line-height: 1.5;
    padding: 10px 0;
    font-size: ${fontSizes.f12};
    color: ${textColors.harrison};
    font-weight: 500;
    text-align: center;
  }
`;
