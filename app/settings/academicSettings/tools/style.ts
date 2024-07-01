import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  border-top: 1px solid ${bgColors.whiteSmoke};
  padding: 20px;
  display: flex;
  gap: 16px;
  //height: 75vh;
  align-items: flex-start;
  flex-wrap: wrap;

  @media (max-width: 1300px) {
    flex-wrap: wrap;
  }

  .card {
    display: flex;
    justify-content: space-between;
    min-height: 130px;
    min-width: 370px;
    background: ${bgColors.white};
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
    border-radius: 12px;

    .text-side {
      padding: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 4px;

      .title-card {
        font-size: ${fontSizes.f12};
        color: ${textColors.sceptreBlue};
        font-weight: 600;
      }

      .title-date {
        font-size: ${fontSizes.f14};
        color: ${textColors.yourShadow};
        font-weight: 500;
      }

      button {
        padding: 0 10px;
        margin-top: 12px;
      }
    }
  }
`;
