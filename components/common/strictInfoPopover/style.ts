import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
  gap: 6px;
  max-width: 230px;

  background: ${bgColors.inDark};
  box-shadow:
    0 40px 64px -12px rgba(0, 0, 0, 0.08),
    0 0 14px -4px rgba(0, 0, 0, 0.05),
    0 32px 48px -8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(16px);
  border-radius: 8px;

  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1.33;
  color: ${textColors.white};

  .info {
    font-weight: 400;
    color: ${textColors.brotherBlue};
  }
`;
