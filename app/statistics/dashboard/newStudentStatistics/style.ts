import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div`
  margin: 20px 40px;
  // background: ${bgColors.white};
  //   padding: 20px;
  border-radius: 12px;

  .title-stat {
    font-size: ${fontSizes.f14};
    font-weight: 600;
    padding: 0;
    margin: 0;
    line-height: 1;
    white-space: nowrap;
  }

  .header-side {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    & > form {
      display: flex;
      gap: 13px;
    }
  }
`;
