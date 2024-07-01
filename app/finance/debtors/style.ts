import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const TableWrapper = styled.div`
  box-shadow: 0 40px 64px -12px rgba(0, 0, 0, 0.08),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 32px 48px -8px rgba(0, 0, 0, 0.1);
  border-radius: ${borders.b6};
  margin: 20px 40px 0 40px;
  overflow: hidden;
  background-color: ${bgColors.white};
`;
export const AllDebts = styled.div`
  padding: 20px;
  display: flex;
  gap: 8px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  .title {
    color: ${textColors.yourShadow};
    font-size: ${fontSizes.f14};
    font-weight: 600;
    letter-spacing: -0.14px;
  }
  .sum {
    color: ${textColors.dark};
    font-size: ${fontSizes.f16};
    font-weight: 500;
    letter-spacing: -0.16px;
  }
`;
