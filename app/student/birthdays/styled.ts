import styled from "@emotion/styled";

import { bgColors, borders } from "styles/theme";

export const Wrapper = styled.div`
  .sectionTable {
    margin: 20px 40px 0 40px;
    background: ${bgColors.white};

    box-shadow: 0 40px 64px -12px rgba(0, 0, 0, 0.08),
      0 0 14px -4px rgba(0, 0, 0, 0.05), 0 32px 48px -8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }
  .filter-wrapper {
    margin: 10px 40px 0 40px;
    background: ${bgColors.white};
    border-radius: ${borders.b6};
    padding: 20px;
  }

  table {
    .ind {
      padding: 0 6px;
      background: ${bgColors.primary};
      border-radius: 3px;
    }
  }
`;
