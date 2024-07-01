import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div``;
export const CallTableWrapper = styled.div`
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

export const MonthWrapper = styled.div`
  padding: 10px 22px;
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

  & > audio {
    width: 200px;
    height: 25px;
  }

  & > audio::-webkit-media-controls-current-time-display {
    display: none;
  }

  & > audio::-webkit-media-controls-toggle-closed-captions-button {
    display: none;
  }
`;
