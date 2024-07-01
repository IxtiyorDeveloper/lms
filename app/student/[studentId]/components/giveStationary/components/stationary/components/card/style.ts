import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { css } from "@emotion/react";

export const Wrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  height: 142px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  border-radius: 8px;
  border: 1px solid ${bgColors.purpleCrystal};
  background: ${bgColors.white};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  transition: 0.4s;
  position: relative;
  max-width: 50%;
  overflow-y: auto;

  ${(p) =>
    p.isActive
      ? css`
          border: 1px solid ${bgColors.primary};
          text-overflow: ellipsis;
          overflow: hidden;

          .desc {
            color: ${textColors.palomino};
            font-size: 12px;
            font-weight: 500;
            letter-spacing: -0.12px;
            text-align: center;
          }
        `
      : ""}

  .scan {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    gap: 6.5px;
  }

  .not_given {
    display: flex;
    align-items: center;
    gap: 4px;
    color: ${textColors.pop};
    font-size: ${fontSizes.f12};
    font-weight: 500;
    letter-spacing: -0.12px;
  }

  .btn {
    position: absolute;
    right: 10px;
    bottom: 10px;
    border-radius: 4.5px;
    background: ${bgColors.primary};
    box-shadow: 1.5px 1.5px 1.5px 0 rgba(255, 255, 255, 0.2) inset,
      -1.5px -1.5px 1.5px 0 rgba(0, 0, 0, 0.02) inset;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5px;
    height: 24px;
    width: 24px;
  }

  .items {
    display: flex;
    overflow-y: auto;
    max-width: 100%;
    gap: 20px;
    width: 100%;
  }
`;
