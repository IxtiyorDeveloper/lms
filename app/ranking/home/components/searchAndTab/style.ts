import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

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
  .flex {
    display: flex;
    gap: 12px;
    max-width: 380px;
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
