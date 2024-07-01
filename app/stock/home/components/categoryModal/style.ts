import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.form`
  .input-container {
    display: flex;
    gap: 20px;
    margin-top: 20px;
    .item {
      width: 50%;
    }
  }

  .buttons {
    background: ${bgColors.brilliance};
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding-top: 16px;
    align-items: center;

    .btns {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      align-items: center;
    }
  }

  .title {
    color: ${textColors.sceptreBlue};
    font-size: ${fontSizes.f14};
    font-weight: 700;
    letter-spacing: -0.14px;
  }
`;

export const Divider = styled.div<{ mt: number }>`
  height: 1px;
  margin-left: -24px;
  width: calc(100% + 48px);
  background: ${bgColors.whiteSmoke};
  padding: 0 -20px;
  margin-top: ${(p) => p.mt}px;
`;
