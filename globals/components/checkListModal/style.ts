import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Title = styled.div`
  display: flex;
  gap: 4px;
  color: ${textColors.blueGray};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 32px;
  p {
    color: ${textColors.soulfulBlue};
  }
`;

export const TimeLineWrapper = styled.div`
  padding: 12px;
  .ant-timeline .ant-timeline-item-head {
    background-color: transparent;
    margin-top: 12px;
  }
  .ant-timeline .ant-timeline-item-tail {
    border-inline-start: 2px solid ${bgColors.purpleCrystal};
  }
  .checked .ant-timeline-item-tail {
    border-inline-start: 2px solid ${bgColors.midori};
  }
`;
export const OrderWrapper = styled.div<{ passed: boolean }>`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${textColors.white};
  font-size: ${fontSizes.f20};
  font-weight: 700;
  font-family: "Space Grotesk", sans-serif !important;
  letter-spacing: 0.5px;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.08) inset;
  background: ${({ passed }) => (passed ? bgColors.midori : bgColors.blueGray)};
`;
export const ItemWrapper = styled.div`
  padding: 14px 12px;
  border-radius: 8px;
  margin-left: 20px;
  background: ${bgColors.whiteSmoke};
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.08) inset;
  cursor: pointer;
`;
export const ItemTitle = styled.div`
  color: ${textColors.blueGray};
  font-size: ${fontSizes.f12};
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.5px;
`;
