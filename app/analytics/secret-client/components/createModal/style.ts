import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  border-right: 20px;
  overflow: hidden;

  .title {
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 1.42;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};
  }

  .mt {
    margin-top: 20px;
  }

  .padding {
    padding: 20px 20px 0 20px;
  }

  .buttons {
    box-sizing: border-box;
    margin-top: 150px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding: 16px 20px 20px;
    height: 76px;
    background: ${bgColors.brilliance};
    border-top: 1px solid ${bgColors.whiteSmoke};
    gap: 10px;
    justify-content: right;
  }
`;
