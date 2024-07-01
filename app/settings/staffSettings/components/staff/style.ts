import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;

  .badge {
    position: absolute;
    right: 0;
    z-index: 10;

    background: ${bgColors.ginger};
    border-radius: 40px;
  }
`;
