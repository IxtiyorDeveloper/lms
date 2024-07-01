import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 50px;
  justify-content: flex-end;
  .cancel {
    padding: 10px 24px;
    color: ${textColors.yourShadow};
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    border-radius: 8px;
  }

  .save {
    border-radius: 8px;
    padding: 10px 24px;
    color: ${textColors.dark};
  }
`;
export const InputNumberWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
export const RadioContentWrapper = styled.div`
  width: 100%;
  padding: 10px 10px;
  overflow: hidden;
  .nums {
    font-weight: 700;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    display: flex;
    align-items: center;
    color: ${textColors.dark};
  }
  .text {
    margin-top: 12px;
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    display: flex;
    align-items: center;
    color: ${textColors.yourShadow};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;
export const CustomDay = styled.div`
  border: 1px solid ${bgColors.whiteSmoke};
  margin-top: 22px;
  font-family: Inter, sans-serif !important;
  border-radius: ${borders.b10};
`;
export const HeadContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 14px 24px 14px 24px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  .text {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    display: flex;
    align-items: center;
    color: ${textColors.yourShadow};
  }
`;
export const BRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 13px 20px;
`;
