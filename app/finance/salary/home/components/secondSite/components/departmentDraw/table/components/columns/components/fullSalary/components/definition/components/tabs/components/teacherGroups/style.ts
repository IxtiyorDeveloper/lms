import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";
import { ESalaryRange } from "types/finance/salary";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 8px;
  margin-top: 8px;

  .range-${ESalaryRange.UNCLEAR} {
    color: ${textColors.yourShadow};
    background: ${bgColors.purpleCrystal};
  }

  .range-${ESalaryRange.LOW} {
    background: ${textColors.pop};
    color: ${textColors.white};
  }

  .range-${ESalaryRange.HIGH} {
    color: ${textColors.white};
    background: ${bgColors.deep};
  }

  .range-${ESalaryRange.NORMAL} {
    color: ${textColors.white};
    background: ${bgColors.secondary};
  }
`;
export const Box = styled.div`
  border-radius: 6px;
  background: ${bgColors.sceptreBlue};
  padding: 10px;
  position: relative;
  overflow: hidden;
`;
export const Mark = styled.div`
  position: absolute;
  width: 10px;
  height: 42px;
  left: -6px;
  top: calc(50% - 42px / 2);
  border-radius: 10px;
  flex: none;
  order: 2;
  flex-grow: 0;
  z-index: 2;
`;
export const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  .name {
    color: ${textColors.whiteSmoke};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.12px;
  }
`;
export const Right = styled.div`
  .studying {
    text-align: center;
    font-weight: 600;
    font-size: ${fontSizes.f12};
    padding: 1px 8px;
    color: ${textColors.white};
    border-radius: 40px;
    display: flex;
    align-items: center;
    height: fit-content;
  }
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;
export const GroupCount = styled.div`
  border-radius: 40px;
  background: ${bgColors.blueGray};
  display: flex;
  padding: 2px 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: ${textColors.brilliance};
  font-size: ${fontSizes.f12};
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.12px;
`;

export const SalaryWrapper = styled.div<{
  shadow?: string;
  textColor?: string;
  cursorPointer?: boolean;
}>`
  font-weight: 700;
  font-size: ${fontSizes.f12};
  line-height: 1.1;
  text-align: center;
  letter-spacing: -0.01em;
  color: ${(props) =>
    props.textColor ? props.textColor : textColors.brilliance};
  background-color: ${(props) => props.color};
  padding: 3px 4px;
  width: fit-content;
  border-radius: ${borders.b4};
  display: flex;
  justify-content: center;
  box-shadow: ${(props) => (props.shadow ? props.shadow : "unset")};
  ${(props) => (!!props.cursorPointer ? "cursor:pointer" : "")}
`;
