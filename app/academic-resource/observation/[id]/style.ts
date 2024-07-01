import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 40px;
`;
export const Tabs = styled.div`
  border-radius: 12px 12px 6px 6px;
  background: ${bgColors.white};
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  height: 72px;
  padding: 16px 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  margin-top: 20px;
`;
export const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;
export const Content = styled.div`
  margin-top: 8px;
`;
