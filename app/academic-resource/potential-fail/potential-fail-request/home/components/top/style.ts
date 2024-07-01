import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid var(--e-6-e-8-ec, #e6e8ec);
  border-radius: 6px;
  background: ${bgColors.white};
  box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.05);
`;
export const Right = styled.div`
  display: flex;
  gap: 12px;
`;
