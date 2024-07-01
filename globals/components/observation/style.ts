import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 20px;
`;
export const Title = styled.p`
  color: ${textColors.blueGray};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.14px;
`;
export const CardWrapper = styled.div`
  margin-top: 24px;
`;
export const GroupWrapper = styled.div`
  margin-top: 20px;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  background: ${bgColors.brilliance};
  padding: 20px;
  border-top: 1px solid ${textColors.whiteSmoke};
`;
