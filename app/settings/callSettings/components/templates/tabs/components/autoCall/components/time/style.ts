import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 25%;
  padding: 16px;
  background: ${bgColors.whiteSmoke};
  border-radius: 12px;
`;
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Left = styled.div`
  display: flex;
  gap: 8px;
`;
export const Right = styled.div`
  display: flex;
  gap: 8px;

  input {
    max-width: 50px;
  }
`;
export const Label = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: ${bgColors.sceptreBlue};
`;
export const DaysWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;
export const Title = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: ${textColors.blueGray};
`;
