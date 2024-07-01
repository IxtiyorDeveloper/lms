import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 10px;
  height: 100%;
`;
export const RowWrapper = styled.div`
  margin-bottom: 10px;
`;
export const PersonalBox = styled.div`
  background: ${textColors.whiteSmoke};
  border-radius: ${borders.b6};
  padding: 6px;
  position: relative;
  height: 100%;

  .name {
    font-weight: 700;
    font-size: ${fontSizes.f10};
    line-height: 12px;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};
    width: 80%;
  }

  .date {
    font-weight: 500;
    font-size: ${fontSizes.f10};
    line-height: 12px;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};
    margin-top: 7px;
  }

  .hour {
    margin-top: 7px;
    font-weight: 500;
    font-size: ${fontSizes.f10};
    line-height: 12px;
    letter-spacing: -0.01em;
    color: ${textColors.yourShadow};
  }

  .badge {
    position: absolute;
    right: 8px;
    top: 8px;
  }
`;
export const ActionBoxes = styled.div`
  display: flex;
  height: 100%;
`;
export const ActionWrapper = styled.div`
  display: flex;
  width: 50%;
`;
export const ArrowWrapper = styled.div`
  height: 100%;
  width: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ActionBox = styled.div<{ color: string }>`
  display: flex;
  background: ${(props) => props.color};
  border-radius: 6px;
  flex-direction: column;
  padding: 6px;
  width: 100%;
  .lesson {
    font-weight: 500;
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.yourShadow};
    text-align: right;
  }
`;

export const TopRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  .group {
    font-weight: 700;
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};
  }
`;
export const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  .from {
    font-weight: 500;
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: #353945;
  }

  .to {
    font-weight: 500;
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: #353945;
  }
  .arrow {
    width: 7px;
    border-radius: 2px;
    background: ${bgColors.yourShadow};
    height: 1px;
  }
`;
export const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 11px;
  align-items: center;
`;
