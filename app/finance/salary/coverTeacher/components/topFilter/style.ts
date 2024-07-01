import { bgColors, borders } from "styles/theme";
import styled from "@emotion/styled";

export const TopFilterWrapper = styled.div`
  width: 100%;
  border-radius: ${borders.b6};
  background: ${bgColors.brilliance};
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.05);
  padding: 20px 20px 0 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const Left = styled.div`
  display: flex;
  gap: 10px;
  .active {
    background-color: ${bgColors.primary};
  }
  .inactive {
    background-color: ${bgColors.whiteSmoke};
  }
`;

export const Right = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
