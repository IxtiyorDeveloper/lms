import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  background-color: ${bgColors.brilliance};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 8px;

  .title-site {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
  }

  .right-site {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }

  .flex {
    padding: 20px;
    display: grid;
    gap: 12px;
    overflow-x: auto;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
  }
`;

export const HeadTitle = styled.h2`
  font-size: ${fontSizes.f20};
  font-weight: 600;
  color: ${textColors.sceptreBlue};
`;
