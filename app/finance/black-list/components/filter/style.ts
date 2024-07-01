import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const FilterWrapper = styled.div`
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  margin: 20px 40px 0 40px;
  padding: 20px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background-color: ${bgColors.brilliance};

  .inputs-side {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 14px;

    @media (max-width: 900px) {
      width: 100%;
    }

    .input-el {
      min-width: 250px;

      @media (max-width: 900px) {
        width: 100%;
        min-width: 40px;
      }
    }
  }

  .buttons-side {
    display: flex;
    align-items: center;
    gap: 14px;

    @media (max-width: 900px) {
      width: 100%;
      justify-content: flex-end;
    }

    .reset-button {
      background-color: ${bgColors.whiteSmoke};
      color: ${textColors.yourShadow};
    }
  }
`;
