import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  border-radius: 8px;
  background-color: ${bgColors.brilliance};
  padding: 20px;
  margin-top: 10px;

  .recharts-brush {
    background-color: red !important;

    .recharts-brush-slide {
      background-color: red !important;
    }
  }
  .recharts-brush-texts {
    display: none !important;
  }
`;
