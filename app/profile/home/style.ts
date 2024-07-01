import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 0 40px;

  .container {
    border-radius: 14px;
    border: 1px solid ${bgColors.purpleCrystal};
    background: ${bgColors.brilliance};
    overflow: hidden;
    .top {
      background: linear-gradient(
        180deg,
        ${bgColors.dark} 0%,
        ${bgColors.mineShaft} 100%
      );
      padding: 43px 0 33px 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .content {
      padding: 0 30px 30px 30px;
    }
  }
`;
