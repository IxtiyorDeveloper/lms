import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const ChildWrapper = styled.div`
  border-top: 1px solid ${bgColors.whiteSmoke};
  padding: 20px 30px;

  .flex {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 20px;
    justify-content: flex-end;
  }
`;
