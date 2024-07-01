import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  .item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    background: ${bgColors.whiteSmoke};
    border-radius: 8px;
    width: 100%;
    gap: 6px;

    .label {
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      letter-spacing: -0.01em;
      color: ${textColors.yourShadow};
    }

    .info {
      font-weight: 700;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.01em;
      color: ${textColors.sceptreBlue};
    }
  }
`;
