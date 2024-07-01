import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const StaffInfoWrapper = styled.div`
  border-radius: 12px;
  padding: 20px;
  background: ${bgColors.whiteSmoke};
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.15) inset;
  .col_left {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .col_right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
