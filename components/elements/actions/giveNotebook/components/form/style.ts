import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Container = styled.div`
  padding: 8px;
  width: 240px;

  .title {
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${textColors.sceptreBlue};
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.14px;
  }

  .divider {
    height: 1px;
    width: 100%;
    background: ${bgColors.whiteSmoke};
    margin: 8px 0;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
    height: 210px;
    overflow-y: auto;
    .item:first-child {
      margin-top: 4px;
    }
    .item {
      width: 95%;
      margin-left: 2.5%;
      display: flex;
      padding: 8px;
      flex-direction: column;
      gap: 6px;
      align-self: stretch;
      border-radius: 4px;
      background: ${bgColors.whiteSmoke};
      position: relative;

      .cancel {
        border-radius: 40px;
        border: 1px solid ${bgColors.white};
        background: ${bgColors.pop};
        position: absolute;
        right: -4px;
        top: -4px;
        display: flex;
        width: 16px;
        height: 16px;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }

      .flex {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .name {
          color: ${textColors.soulfulBlue};
          font-size: ${fontSizes.f10};
          font-weight: 400;
          letter-spacing: -0.1px;
        }

        .values {
          color: ${textColors.sceptreBlue};
          font-size: ${fontSizes.f12};
          font-weight: 500;
          letter-spacing: -0.12px;
        }
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
  }
`;
