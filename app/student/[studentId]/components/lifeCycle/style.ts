import styled from "@emotion/styled";

export const DescriptionWrapper = styled.div`
  //max-width: 300px;
  width: 100%;
`;
export const Wrapper = styled.div`
  width: 100%;
  padding: 20px 24px;
  .basic-table-container {
    table {
      overflow: hidden !important;
      th {
        padding: 0 10px !important;
        &:first-of-type {
          padding-left: 10px !important;
        }
      }
      td {
        padding: 10px !important;
      }

      td:first-of-type {
        padding-left: 10px !important;
      }
    }
  }
  .mw {
    width: fit-content;
    padding: 20px;
  }
`;
