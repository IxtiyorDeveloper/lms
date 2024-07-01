import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 0 12px;
  min-width: 150px;
`;

export const Row = styled.div`
  padding: 12px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${bgColors.blueGray};
  gap: 20px;
`;

export const Label = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: -0.01em;
  color: ${textColors.brotherBlue};
`;

export const Percentage = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: -0.01em;
  color: ${textColors.brilliance};
`;
