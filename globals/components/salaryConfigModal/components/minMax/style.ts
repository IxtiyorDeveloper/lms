import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  //margin-top: 20px;
  .container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 20px 20px 20px;
    .red {
      display: flex;
      flex: 1;
      width: 100%;
    }
  }
  .plus {
    margin-left: 12.5px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    border-radius: 10px;
    background: ${bgColors.whiteSmoke};
    box-shadow: 0 0 45px 0 rgba(0, 0, 0, 0.02) inset;
    margin: 0 20px;
    padding: 20px 16px;
  }

  .teaching {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    font-family: "Space Grotesk", sans-serif !important;
    margin-top: 12px;
  }

  .teaching:first-of-type {
    margin-top: 0 !important;
  }

  .suffix {
    font-family: "Space Grotesk", sans-serif !important;
    font-weight: 400;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    text-align: center;
    letter-spacing: -0.01em;
    color: ${textColors.brotherBlue};
  }

  .center {
    display: flex;
    align-items: center;
    justify-self: center;
  }
`;
