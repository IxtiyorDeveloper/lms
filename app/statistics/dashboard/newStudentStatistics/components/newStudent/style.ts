import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const StudentWrapper = styled.div`
  gap: 20px;
  flex-wrap: wrap;
  padding: 20px;
  background-color: ${bgColors.white};
  border-radius: 12px;

  .title {
    font-style: normal;
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    /* identical to box height */

    text-align: center;
    letter-spacing: -0.01em;

    /* #353945 */

    color: ${textColors.sceptreBlue};
    display: flex;
    flex: 1;
    width: 100%;
    grid-column: 1/ 3;
    margin-bottom: 20px;
  }
`;

export const MainContainer = styled.div`
  padding: 20px;
  background-color: ${bgColors.white};
  border-radius: 12px;

  .icon-flex {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .item {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .c-flex {
      display: flex;
      gap: 20px;
      div {
        width: 100%;
      }
    }
  }
`;
