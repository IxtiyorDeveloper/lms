import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  height: 351px;
  border-radius: 8px;
  background-color: ${bgColors.brilliance};
  padding: 20px;
  margin-top: 10px;
  box-shadow: 0 0 12px 0 #f4f5f6 inset;

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
