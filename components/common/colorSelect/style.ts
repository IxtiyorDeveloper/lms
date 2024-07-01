import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div``;

export const Inner = styled.div<{
  required: boolean;
  error: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  padding: 6px;
  background: ${bgColors.yukon};
  border: 1px solid ${bgColors.purpleCrystal};
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  ${({ error }) =>
    !!error &&
    css`
      border-color: ${bgColors.red} !important;
    `}
`;

export const Label = styled.label<{ required: boolean }>`
  font-size: ${fontSizes.f12};
  position: relative;
  color: ${textColors.dark};
  margin-bottom: 9px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.01em;
`;

export const Content = styled.div`
  background: transparent;
  border: 1px solid ${bgColors.purpleCrystal};
  box-shadow: 0 1px 1px ${bgColors.amnesia};
  border-radius: ${borders.b6};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(36px, 1fr));
  gap: 4px;
`;

export const Color = styled.div`
  height: 38px;
  position: relative;
  .abs {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 1;
    z-index: 0;
  }
  &.pd {
    padding: 3px;
    border: 1px solid ${bgColors.dark};
  }
  .color {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .check {
    z-index: 1;
  }
`;
