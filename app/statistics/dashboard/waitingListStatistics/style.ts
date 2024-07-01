import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  margin: 20px 40px;
  background: ${bgColors.white};
  border-radius: 12px;
  padding: 20px;

  .title-stat {
    font-size: ${fontSizes.f14};
    padding: 0;
    margin: 0;
    font-style: normal;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};
  }

  .header-side {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    & > form {
      width: 100%;
      display: flex;
      justify-content: space-between;
      gap: 12px;
    }
  }
`;
