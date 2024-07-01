import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  padding: 20px;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 12px;
  background: ${bgColors.brilliance};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.04) inset;

  .title {
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f12};
    font-weight: 700;
    letter-spacing: -0.12px;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 20px;
    .end {
      margin-top: auto;
    }
  }
`;
