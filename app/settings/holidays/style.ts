import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 10px 40px;
  width: 100%;
`;
export const FilterWrapper = styled.div`
  padding: 20px;
  margin-top: 10px;
`;
export const Inner = styled.div`
  background: ${bgColors.white};
  padding: 13px 14px;
  border-radius: 12px;
`;
export const TopContent = styled.div`
  padding-top: 30px;
  padding-right: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .button {
    display: flex;
    gap: 20px;
  }

  .text {
    font-weight: 600;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }
`;
