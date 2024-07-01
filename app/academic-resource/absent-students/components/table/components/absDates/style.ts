import { bgColors, fontSizes, textColors } from "styles/theme";
import styled from "@emotion/styled";

export const AbsCol = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${bgColors.blueGray};
  padding: 12.5px 4px;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  cursor: pointer;
  &:last-of-type {
    border: none;
  }
  p {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: 0.5px;
    color: ${textColors.white};
  }
`;
export const AbsWr = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  box-shadow: 0 40px 64px -12px rgba(0, 0, 0, 0.08),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 32px 48px -8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

export const Row = styled.div`
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  max-height: 350px;
  height: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px !important;
  }

  ::-webkit-scrollbar-track {
    background-color: ${bgColors.mineShaft};
    -webkit-border-radius: 10px !important;
    border-radius: 10px;
    cursor: pointer !important;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px !important;
    border-radius: 10px;
    background: #6f767e;
    cursor: pointer !important;
  }
`;
