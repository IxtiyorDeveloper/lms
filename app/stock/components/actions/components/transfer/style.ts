import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  overflow: hidden;
  border-radius: 16px;

  .title {
    color: ${textColors.sceptreBlue};
    font-size: ${fontSizes.f14};
    font-weight: 700;
    letter-spacing: -0.14px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .flex-c {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .i-wrapper {
    margin-top: 24px;
  }

  .label {
    color: ${textColors.sceptreBlue};
    font-size: ${fontSizes.f12};
    font-weight: 500;
    letter-spacing: -0.12px;
  }

  .selects {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  .flex {
    display: flex;
    gap: 16px;
    margin-top: 20px;
  }

  .p {
    padding: 20px;
  }

  .product {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 25px;

    .name {
      color: ${textColors.dark};
      font-family: SF Pro Display sans-serif;
      font-size: ${fontSizes.f14};
      font-weight: 500;
      line-height: 1.28; /* 128.571% */
    }
    .column {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .flex {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 !important;
      padding: 0;
      width: 100%;
      .type {
        color: ${textColors.sadet};
        font-size: ${fontSizes.f12};
        font-weight: 500;
        letter-spacing: -0.12px;
      }

      .ml {
        margin-left: auto !important;
        display: flex;
        //padding: 4px 8px;
        align-items: center;
        gap: 4px;
        border-radius: 6px;
        background: ${bgColors.sceptreBlue};
        color: ${textColors.sadet};
        font-size: ${fontSizes.f12};
        font-weight: 500;
        letter-spacing: -0.12px;
        height: 25px;
        justify-content: center;
        padding: 0 6px;
      }

      .count {
        color: ${textColors.white};
        font-size: ${fontSizes.f14};
        font-family: SF Pro Display sans-serif;
        font-weight: 500;
      }
    }

    .mt {
      margin-top: 6px !important;
    }

    .shop {
      color: ${textColors.soulfulBlue};
      font-family: SF Pro Display sans-serif;
      font-size: ${fontSizes.f12};
      font-weight: 400;
      margin-top: 6px;
    }

    .flex:nth-child(3) {
      margin-top: 9px;
    }
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .buttons {
    background: ${bgColors.brilliance};
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 16px 20px 20px 20px;
    align-items: center;

    .btns {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      align-items: center;
    }
  }
`;

export const Item = styled.div<{ isActive?: boolean }>`
  width: 100%;
  border-radius: 6px;
  outline: ${(props) =>
    props.isActive ? `2px solid ${bgColors.primary}` : "unset"};
  background: ${bgColors.cascading};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  justify-content: space-between;
  height: 53px;
  padding: 8px;
  color: ${textColors.soulfulBlue};
  font-size: ${fontSizes.f12};
  font-weight: 500;
  line-height: 1.33;
  letter-spacing: 0.24px;

  .count {
    color: ${textColors.dark};
    font-family: Space Grotesk sans-serif;
  }

  .circle {
    background: linear-gradient(
      135deg,
      ${bgColors.midori} 24.59%,
      ${bgColors.pearl} 87.5%
    );
    width: 6px;
    height: 6px;
    stroke-width: 0.5px;
    stroke: ${bgColors.eucalyptus};
    border-radius: 50%;
    align-self: center;
    margin-bottom: 3px;
  }

  .second-circle {
    background: linear-gradient(146deg, #ec913d 27.33%, #fac16c 90%);
    stroke: ${bgColors.ginger};
  }

  .third-circle {
    stroke: ${bgColors.pop};
    background: linear-gradient(148deg, #c00f3a 28.86%, #ef7492 90.28%);
  }

  .flex {
    display: flex;
    justify-content: space-between;
    margin-top: 0 !important;
    height: 56%;

    div:nth-child(1) {
      width: 8%;
      display: flex;
      align-items: flex-start;
      margin-right: -8px;
    }
    div:nth-child(2) {
      width: 100%;
      white-space: nowrap;
    }
    div:nth-child(3) {
      width: 20%;
    }
  }
`;
