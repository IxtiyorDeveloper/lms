import styled from "@emotion/styled";

export const Wrapper = styled.div`
  padding: 12px;
`;

export const Top = styled.div`
  display: flex;
  gap: 40px;
`;
export const Left = styled.div`
  width: 100px;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 10px;
`;
export const Bottom = styled.div`
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px solid #f4f5f6;
  gap: 10px;
  display: flex;
  justify-content: flex-end;
  button {
    width: fit-content;
  }
`;
