import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { css } from "@emotion/react";

export const Wrapper = styled.div`
  margin: 0 20px 20px 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${textColors.purpleCrystal};
  background: ${bgColors.brilliance};
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);

  .mot {
    outline: 2px solid ${bgColors.pop};
    outline-offset: 0.5px;
    position: relative;
    border-radius: 50%;
    height: 75px;

    .img {
      position: absolute;
      width: 24px;
      height: 24px;
      top: 52.5px;
      left: 51px;
      padding: 4.24px;
      border-radius: 21.18px;
      gap: 7.06px;
      z-index: 10;
      background: ${bgColors.pop};
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .text {
    width: 100%;
    overflow: hidden;
  }

  .info {
    display: flex;
    gap: 12px;
    width: 100%;

    .main {
      display: flex;
      flex-direction: column;
      gap: 16px;
      justify-content: center;
      width: 100%;

      .search {
        color: ${textColors.sadet};
        font-size: ${fontSizes.f12};
        font-weight: 600;
        letter-spacing: -0.12px;
        display: flex;
        height: 36px;
        padding: 10px;
        align-items: center;
        gap: 10px;
        align-self: stretch;
        border-radius: 6px;
        border: 1px solid ${bgColors.purpleCrystal};
        background: ${bgColors.white};
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
      }

      .data {
        display: flex;
        gap: 6px;

        .flex {
          display: flex;
        }

        div {
          padding: 4px 8px;
          align-items: center;
          gap: 4px;
          border-radius: 30px;
          max-width: 25%;
          background: ${bgColors.whiteSmoke};
          color: ${textColors.sadet};
          font-size: ${fontSizes.f12};
          font-weight: 600;
          letter-spacing: -0.12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  .divider {
    background: ${bgColors.purpleCrystal};
    width: 100%;
    height: 1px;
  }

  .notes {
    display: flex;
    gap: 12px;
    width: 100%;
    max-width: 100%;
    overflow: hidden;

    .note {
      width: 49%;
      display: flex;
      padding: 10px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 8px;
      flex: 1 0 0;
      align-self: stretch;
      border-radius: 6px;
      border: 1px solid ${bgColors.purpleCrystal};
      background: ${bgColors.cascading};
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
      color: ${textColors.sadet};
      font-size: ${fontSizes.f12};
      font-weight: 600;
      letter-spacing: -0.12px;
    }
  }
`;

export const Note = styled.div<{ full?: boolean }>`
  overflow: hidden;
  color: ${textColors.sceptreBlue};
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.12px;

  ${(p) =>
    p.full
      ? css`
          max-width: 300px;
          padding: 10px;
          white-space: pre-wrap;
        `
      : css`
          max-width: 80%;
        `};
`;

export const PopoverContent = styled.div`
  padding: 8px 12px;
`;
