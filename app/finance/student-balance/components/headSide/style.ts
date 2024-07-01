import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  background-color: ${bgColors.white};
  padding: 20px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  margin-bottom: 10px;

  .recharts-default-legend {
    padding-bottom: 35px !important;
    position: relative !important;
  }
`;
