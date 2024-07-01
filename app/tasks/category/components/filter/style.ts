import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const RightSide = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  .secondary {
    background: ${bgColors.purpleCrystal};
    color: ${bgColors.yourShadow};
  }
`;
