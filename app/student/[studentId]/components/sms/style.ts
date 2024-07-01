import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 24px;
  display: flex;
  gap: 20px;
  overflow-y: auto;
  width: 100%;
  flex-direction: column-reverse;
  border-top: 1px solid ${bgColors.whiteSmoke};
  margin-top: 14px;
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: #ebebeb;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    cursor: pointer !important;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: ${bgColors.paleSky};
    cursor: pointer !important;
  }
`;

export const Box = styled.div`
  background: ${bgColors.whiteSmoke};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  border-radius: 16px 16px 0 16px;
  padding: 10px;
  max-width: 432px;

  .number {
    font-size: ${fontSizes.f10};
    line-height: 16px;
    color: ${textColors.dark};
    font-weight: 600;
  }

  .date {
    font-weight: 400;
    font-size: ${fontSizes.f10};
    line-height: 16px;
    color: ${textColors.dark};
  }
`;
