import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px;
`;

export const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 20px;
  justify-content: center;
  padding-right: 10px;

  .label {
    display: flex;
    justify-content: center;
    gap: 19px;
  }

  .action {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
`;
