import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  .title {
    font-size: ${fontSizes.f14};
    color: ${textColors.dark};
    font-weight: 700;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
