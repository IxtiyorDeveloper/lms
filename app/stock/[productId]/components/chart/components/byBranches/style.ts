import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 120%;
  height: 300px;
  border-radius: 8px;
  background: ${bgColors.brilliance};
  box-shadow: 0 0 12px 0 ${bgColors.whiteSmoke} inset;

  .circle {
    background: linear-gradient(
      135deg,
      ${bgColors.midori} 24.59%,
      ${bgColors.pearl} 87.5%
    );
    width: 9px;
    height: 9px;
    stroke-width: 0.5px;
    stroke: ${bgColors.eucalyptus};
    border-radius: 50%;
    align-self: center;
    margin-bottom: 3px;
    margin-top: 2px;
  }

  .second-circle {
    background: linear-gradient(146deg, #ec913d 27.33%, #fac16c 90%);
    stroke: ${bgColors.ginger};
  }

  .third-circle {
    stroke: ${bgColors.pop};
    background: linear-gradient(148deg, #c00f3a 28.86%, #ef7492 90.28%);
  }

  .fourth-circle {
    stroke: ${bgColors.primary};
    background: linear-gradient(
      148deg,
      ${bgColors.primary} 28.86%,
      ${bgColors.primary} 90.28%
    );
  }

  .flex-c {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    color: ${textColors.sceptreBlue};
    font-size: 12px;
    font-weight: 400;
    letter-spacing: -0.12px;
    gap: 20px;
    padding: 23px 20px 0 23px;

    .item {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }
`;
