import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 20px;
  background: ${bgColors.white};
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;
export const BranchWrapper = styled.div``;
export const StatisticsWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
`;
