import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div``;

export const Inner = styled.div<{
  required: boolean;
  error: boolean;
}>``;

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
  border-radius: ${borders.b6};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 4px;
`;
export const Box = styled.div`
  background: ${bgColors.brilliance};
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.06);
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 24px 5px;
  position: relative;
  overflow: hidden;
  min-width: 150px;
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  max-width: 230px;

  .title {
    font-weight: 500;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }

  .abs {
    position: absolute;
    height: 4px;
    background: #6084ff;
    border-radius: 2px;
    bottom: 5px;
    left: 5px;
    width: calc(100% - 10px);
  }
`;
