import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  @media (max-width: 1200px) {
    flex-direction: column;
  }

  .wr {
    min-width: 200px;

    & label {
      margin-bottom: 0 !important;
    }
  }
  .buttons {
    display: flex;
    width: 100%;
    gap: 10px;
  }
`;
