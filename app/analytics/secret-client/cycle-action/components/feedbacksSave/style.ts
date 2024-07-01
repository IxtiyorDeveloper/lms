import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;

  .buttons {
    display: flex;
    gap: 10px;

    .MuiButton-root {
      font-size: 12px !important;
      font-weight: 600;
    }
  }
`;
