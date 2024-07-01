import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 400px;
  align-items: center;
  border-radius: 8px;
  background: ${bgColors.blueGray};
  padding: 12px;
  align-self: stretch;
`;
export const Left = styled.div`
  display: flex;
  gap: 12px;
`;

export const Personal = styled.div<{ isTeacher?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.isTeacher ? "space-between" : "center")};

  .name {
    color: ${textColors.white};
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
export const Flex = styled.div`
  display: flex;
  gap: 4px;
  .box {
    border-radius: 40px;
    background: ${bgColors.sceptreBlue};
    display: flex;
    padding: 2px 6px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: ${textColors.brilliance};
    text-align: center;
    font-size: ${fontSizes.f10};
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.1px;
    height: fit-content;
  }
`;
export const Last = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
`;
export const Position = styled.div`
  border-radius: 40px;
  background: ${bgColors.sceptreBlue};
  display: flex;
  padding: 2px 6px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: ${textColors.brilliance};
  text-align: center;
  font-size: ${fontSizes.f10};
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.1px;
  height: fit-content;
`;
