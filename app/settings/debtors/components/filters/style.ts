import styled from "@emotion/styled";
import {bgColors} from "styles/theme";

export const FilterWrapper = styled.form`
  background: ${bgColors.brilliance};
  padding: 20px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const RowWrapper = styled.div<{mt?: number}>`
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  margin-top: ${(props) => props.mt}px;  
`;

export const Buttons = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;