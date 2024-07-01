import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  padding: 30px 40px 0 40px;

  .container {
    background: ${bgColors.white};

    .flex-top {
      padding: 4px 0 0 6px;
    }
  }

  .lead-filter {
    background: ${bgColors.brilliance};
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 20px;
  }
`;
