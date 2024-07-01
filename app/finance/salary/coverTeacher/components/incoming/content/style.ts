import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Container = styled.div``;
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
export const DateWrapper = styled.div`
  background: rgba(177, 181, 195, 0.6);
  color: ${textColors.blueGray};
  font-size: ${fontSizes.f12};
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.12px;
  padding: 8px 20px;
`;
export const DayCovers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 22px 0 28px 0;
`;
export const RowContainer = styled.div`
  display: flex;
  gap: 10px;
  .right {
    width: 32px !important;
  }
`;
export const ChangeWrapper = styled.div`
  border-radius: 12px;
  border: 0.5px solid ${bgColors.whiteSmoke};
  background: ${bgColors.brilliance};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .box {
    display: flex;
    padding: 7.5px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
