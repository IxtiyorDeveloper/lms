import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  display: grid;
  gap: 15px;
  min-height: 75vh;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  margin: 20px 40px;
  padding: 20px;
  background-color: ${bgColors.brilliance};
  border-radius: 12px;
`;

export const EmptyWrapper = styled.div`
  grid-column: 1 / 6;
  margin-top: 100px;
`;
