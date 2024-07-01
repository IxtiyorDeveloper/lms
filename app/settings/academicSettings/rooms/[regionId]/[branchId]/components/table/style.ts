import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const TableWrapper = styled.div`
  margin: 0 40px;
  background: ${bgColors.white};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 8px;

  .head-side {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid ${bgColors.whiteSmoke};

    .title-list {
      font-size: ${fontSizes.f14};
      color: ${textColors.sceptreBlue};
      font-weight: 700;
    }
  }
`;

export const NameWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  .count {
    font-size: ${fontSizes.f12};
    color: ${textColors.yourShadow};
  }
`;

export const Active = styled.span`
  padding: 4px 8px;
  font-size: ${fontSizes.f12};
  color: ${textColors.white};
  background: ${bgColors.midori};
  border-radius: 4px;
  font-weight: 500;
`;

export const NotActive = styled.span`
  padding: 4px 8px;
  font-size: ${fontSizes.f12};
  color: ${textColors.white};
  background: ${bgColors.pepper};
  border-radius: 4px;
  font-weight: 500;
`;

export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
