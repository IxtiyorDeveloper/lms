import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const ExamDateWrapper = styled.div`
  background: ${bgColors.whiteSmoke};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${fontSizes.f16};
  line-height: 1;
  flex-direction: column;
  gap: 8px;
  font-weight: 500;
  letter-spacing: -.01em;
  color: ${textColors.brotherBlue};
`;
