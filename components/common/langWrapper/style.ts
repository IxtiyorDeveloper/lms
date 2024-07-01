import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  //gap: -40px;

  .col {
    border: 1px solid ${bgColors.purpleCrystal};
    transform: rotate(90deg);
    height: 100%;
    width: 24px;
  }

  .flag {
    display: flex;
    align-items: center;
  }
`;
