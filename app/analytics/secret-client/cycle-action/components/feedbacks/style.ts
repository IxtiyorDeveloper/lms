import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;

  .title {
    font-weight: 700;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};
  }

  .gap {
    gap: 14px;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .info-quil {
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.1px;
    color: ${bgColors.dark};
    margin-top: 24px;

    .info {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .rate-container {
    display: flex;
    padding: 4px 4px 0 4px;
    background: ${bgColors.whiteSmoke};
    border: 1px solid ${bgColors.purpleCrystal};
    border-radius: 6px;
    align-items: center;
  }

  .inputs {
    margin-top: 24px;
  }

  .quill {
    margin-top: 12px !important;
  }
`;
