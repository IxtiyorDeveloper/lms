import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

export const Box = styled.div`
  padding: 20px;
  background: ${bgColors.brilliance};
  border: 0.5px solid ${bgColors.whiteSmoke};
  box-shadow: inset 0px 0px 45px rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  width: 50%;
`;

export const Flex = styled.div`
  display: flex;
`;

export const Left = styled.div`
  min-width: 350px;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  width: 50%;
`;
