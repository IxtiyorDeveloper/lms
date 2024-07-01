import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  background-color: ${bgColors.white};
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(267px, 1fr));
  gap: 12px;
  margin-top: 5px;
`;
