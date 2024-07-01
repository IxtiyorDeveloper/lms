import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  .title {
    font-size: 32px;
    font-weight: 600;
  }

  .flex {
    display: flex !important;
    gap: 20px;
    align-items: center;
    img:first-child {
      margin-top: 32px;
    }
  }
`;
