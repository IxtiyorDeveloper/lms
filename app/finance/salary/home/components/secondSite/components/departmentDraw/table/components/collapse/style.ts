import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 9px;
  width: 100%;
`;
export const Card = styled.div`
  background: ${bgColors.brilliance};
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.04);
  border-radius: ${borders.b8};
  width: 100%;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Top = styled.div`
  position: relative;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  text-align: left;
  letter-spacing: -0.01em;
  color: ${textColors.blueGray};
  padding: 0 16px 11px 16px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  width: 100%;
  display: flex;
  gap: 6px;
  .abs {
    cursor: pointer;
    position: absolute;
    right: 16px;
    top: 0;
  }
  .title {
  }
  .num {
  }
`;
export const Labels = styled.div`
  flex: 1;
  padding-bottom: 20px;
  max-height: 250px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 10px !important;
  }

  ::-webkit-scrollbar-track {
    background-color: ${bgColors.purpleCrystal};
    -webkit-border-radius: 10px !important;
    border-radius: 10px;
    cursor: pointer !important;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px !important;
    border-radius: 10px;
    background: ${bgColors.paleSky};
    cursor: pointer !important;
  }

  .row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid ${bgColors.whiteSmoke};
    padding: 10px 16px;
    align-items: center;
    gap: 10px;

    &:last-of-type {
      border-bottom: none;
    }

    .left {
      flex: 1;
      overflow-x: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: left;

      &.active {
        font-weight: 500;
        font-size: ${fontSizes.f10};
        line-height: 1.2;
        text-align: left;
        letter-spacing: -0.01em;
        color: ${textColors.blueGray};
      }

      &.inactive {
        text-decoration: line-through;
        font-size: ${fontSizes.f10};
        line-height: 1.2;
        text-align: left;
        letter-spacing: -0.01em;
        color: ${textColors.brotherBlue};
      }
    }

    .right {
      display: flex;
      align-items: center;
      gap: 10px;
      width: fit-content;
      justify-content: flex-end;

      .text {
        &.ractive {
          font-weight: 700;
          font-size: ${fontSizes.f10};
          line-height: 1.2;
          text-align: center;
          letter-spacing: -0.01em;
          color: ${textColors.blueGray};
        }

        &.rinactive {
          font-weight: 700;
          text-decoration: line-through;
          font-size: ${fontSizes.f10};
          line-height: 1.2;
          text-align: center;
          letter-spacing: -0.01em;
          color: ${textColors.brotherBlue};
        }

        &.green {
          color: ${textColors.midori};
        }

        &.red {
          color: ${textColors.pop};
        }
      }

      .delete {
        cursor: pointer;
      }
    }
  }
`;
export const Row = styled.div``;
export const Bottom = styled.div`
  padding: 10px 16px 0 16px;
  font-weight: 700;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  text-align: right;
  letter-spacing: -0.01em;
  color: ${textColors.blueGray};
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  border-top: 1px solid ${bgColors.purpleCrystal};
`;
export const Container = styled.div`
  background-color: ${bgColors.white};
  padding: 18px;
`;

export const PopoverContainer = styled.div`
  background-color: ${bgColors.white};
  padding: 18px;
  min-width: 265px;
  /* #E6E8EC */

  border: 0.5px solid ${bgColors.purpleCrystal};
  /* Shadow 2 */

  box-shadow: 0 40px 64px -12px rgba(0, 0, 0, 0.08),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 32px 48px -8px rgba(0, 0, 0, 0.1);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 12px;
  .title {
    font-weight: 700;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    text-align: left;
    letter-spacing: -0.01em;
    color: ${textColors.blueGray};
  }

  .inputs {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 10px;
  }
`;
export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  width: 100%;

  .cancel {
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    border-radius: 8px;
    height: 40px;
    font-weight: 700;
    background-color: ${bgColors.wildSand};
    width: 100% !important;
  }

  .save {
    box-shadow: inset 0 4px 6px #ffe866;
    border-radius: 8px;
    font-weight: 700;
    height: 40px;
    width: 100% !important;
  }
`;
