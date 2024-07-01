import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Title = styled.h2``;

export const WrapStatus = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const BodyWrapper = styled.div`
  background-color: ${bgColors.brilliance};
  border-radius: 10px;

  .class {
    border-radius: 10px;
  }
`;

export const StatusWrapper = styled.span`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 3px;
  padding: 2px 8px;
  border-radius: 20px;
  color: ${textColors.white};
  font-weight: 500;
  font-size: ${fontSizes.f12};
`;
