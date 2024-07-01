import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;

  .center {
    margin-left: -4vw;
    align-items: center;
    display: flex;
  }

  .menu {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .container {
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${textColors.sceptreBlue};
    white-space: nowrap;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: -0.12px;
    margin-bottom: 8px;
    margin-left: 34px;
  }
  .flex {
    display: flex;
    gap: 12px;
    max-width: 380px;
    align-items: flex-end;
    .filter {
      border-radius: 8px;
      background: ${bgColors.primary};
      width: auto;
      padding: 8px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
