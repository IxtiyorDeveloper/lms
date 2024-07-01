import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div``;
export const PaymentWrapper = styled.div`
  .basic-table-container {
    table {
      th {
        padding: 0 !important;
        &:first-of-type {
          padding-left: 10px !important;
        }
      }
      td {
        padding: 10px 0 !important;
      }

      td:first-of-type {
        padding-left: 10px !important;
      }
    }
  }
`;
export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  .hour {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 12px;
    letter-spacing: -0.01em;
    color: ${textColors.yourShadow};
  }
`;
