import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { css } from "@emotion/react";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Wrapper = styled.div`
  border-radius: 12px;
  background: ${bgColors.white};
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin: 0 40px;

  .info {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .product {
      display: flex;
      align-items: center;
      gap: 12px;

      .flex {
        display: flex;
        align-items: center;
        gap: 8px;
        .edit {
          display: flex;
          width: 30px;
          height: 30px;
          padding: 6px;
          justify-content: center;
          align-items: center;
          gap: 8px;
          border-radius: 24px;
          border: 1px solid ${bgColors.purpleCrystal};
          background: ${bgColors.brilliance};
        }

        .type {
          color: ${textColors.sadet};
          font-size: ${fontSizes.f12};
          font-weight: 500;
          letter-spacing: -0.12px;
        }
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
  }

  .flex-container {
    width: 100%;
    display: flex;
    gap: 20px;
  }

  .buttons {
    display: flex;
    gap: 10px;
    align-items: center;
  }
`;

export const ProductFor = styled.div<{ isCompany?: boolean }>`
  display: flex;
  height: 18px;
  padding: 0 6px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 10px;
  background: ${bgColors.lemon};
  color: ${textColors.kenyan};
  font-family: SF Pro Display sans-serif;
  font-size: ${fontSizes.f9};
  font-weight: 500;
  text-transform: uppercase;

  &::after {
    content: "STUDENT";
  }

  ${(props) =>
    props.isCompany
      ? css`
          background: ${bgColors.sinter};
          color: ${textColors.royal};
          &::after {
            content: "COMPANY";
          }
        `
      : ""}
`;

export const TabItem = styled.div<{ bool: boolean }>`
  display: flex;
  gap: 4px;
  align-items: center;

  font-weight: 700;
  font-size: 12px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: #23262f;

  ${(props) =>
    props.bool
      ? css`
          color: #23262f;
        `
      : css`
          color: ${textColors.soulfulBlue};
        `}
`;
