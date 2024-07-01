import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div``;

export const Inner = styled.div<{
  required: boolean;
  error: boolean;
}>`
  .icon {
    width: 16px;
    height: 16px;
    position: absolute;
    bottom: -4px;
    right: -4px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    cursor: pointer;

    &.active {
      background: ${bgColors.midori};
    }

    &.inactive {
      background: ${bgColors.pepper};
    }
  }
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
