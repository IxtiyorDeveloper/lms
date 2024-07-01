import styled from "@emotion/styled";

export const StudentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(540px, 1fr));
  gap: 20px;
  flex-wrap: wrap;

  .full {
    @media (min-width: 1400px) {
      grid-column: 1/3 !important;
    }
  }
`;
