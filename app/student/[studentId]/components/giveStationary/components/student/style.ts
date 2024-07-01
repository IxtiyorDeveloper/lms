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

  .text {
    width: 100%;
    overflow: hidden;
  }

  .name {
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f14};
    font-weight: 600;
    letter-spacing: -0.14px;
  }

  .level {
    color: ${textColors.soulfulBlue};
    font-size: ${fontSizes.f12};
    font-weight: 600;
    letter-spacing: -0.12px;
  }

  .info {
    display: flex;
    gap: 12px;
    width: 100%;

    .main {
      height: 68px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      justify-content: center;
      width: 100%;

      .data {
        display: flex;
        gap: 6px;
        margin-top: 6px;
        flex-wrap: wrap;

        .flex {
          display: flex;
        }

        div {
          display: flex;
          padding: 0 8px;
          justify-content: center;
          align-items: center;
          gap: 4px;
          border-radius: 30px;
          background: ${bgColors.whiteSmoke};
          color: ${textColors.sadet};
          font-size: ${fontSizes.f12};
          font-weight: 600;
          letter-spacing: -0.12px;
          white-space: nowrap;
          //max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .payment-info {
      display: flex;
      align-items: center;
      min-width: 120px;
      justify-content: right;
    }
  }

  .divider {
    background: ${bgColors.purpleCrystal};
    width: 100%;
    height: 1px;
  }
`;

export const Note = styled.div<{ full?: boolean }>`
  overflow: hidden;
  color: ${textColors.sceptreBlue};
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
      : css``};
`;

export const Container = styled.div`
  .notes {
    display: flex;
    gap: 10px;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    flex-direction: column;
    padding: 0 20px 20px 20px;

    .note {
      width: 100%;
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
