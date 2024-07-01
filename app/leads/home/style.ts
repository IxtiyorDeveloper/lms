import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  padding: 30px 40px 0 40px;

  .lead-filter {
    background: ${bgColors.brilliance};
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 20px;
  }
`;

export const NoteWrapperLead = styled.div`
  padding: 20px 0 0 0;
  gap: 16px;
  display: grid;
`;
export const StatisticsCollapse = styled.div`
  background: ${bgColors.white};
  box-shadow: 0px 0px 24px 0px #0000000d;
  padding: 4px 8px;
  border-radius: 8px;
  margin-top: 20px;
`;
