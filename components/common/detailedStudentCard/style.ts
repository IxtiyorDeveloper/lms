import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 16px 20px;
  display: flex;
  border-radius: 12px;
  background: ${bgColors.whiteSmoke};
  .p-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 14px;
    gap: 8px;
    .full-name {
      color: ${textColors.blueGray};
      font-size: ${fontSizes.f14};
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: -0.14px;
    }
    .phone {
      color: ${textColors.blueGray};
      font-size: ${fontSizes.f12};
      font-style: normal;
      font-weight: 500;
      line-height: 1.5;
      letter-spacing: -0.12px;
    }
  }
  .actions {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    justify-content: flex-end;
    flex: 1;
  }
`;
