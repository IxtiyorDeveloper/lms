import styled from "@emotion/styled";

export const IconWrapper = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;
