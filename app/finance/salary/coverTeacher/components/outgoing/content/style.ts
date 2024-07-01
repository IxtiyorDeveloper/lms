import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Container = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const Wrapper = styled.div`
  background: ${bgColors.whiteSmoke};
`;
export const CoverRow = styled.div`
  display: flex;
  .svg {
    width: 30px;
    height: 68px;
    display: flex;
    align-items: center;
  }
`;
export const Left = styled.div`
  display: flex;
  width: 50%;
`;
export const Right = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
`;

export const RowContainer = styled.div`
  display: flex;
  gap: 10px;
  .right {
    width: 32px !important;
  }
`;
