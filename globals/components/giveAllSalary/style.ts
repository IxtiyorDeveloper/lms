import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 20px 0 20px;
`;
export const Content = styled.div`
  width: 100%;
`;
export const Line = styled.div`
  background: ${bgColors.whiteSmoke};
  width: 100%;
  height: 1px;
  margin: 20px 0;
`;
export const WarningWrapper = styled.div`
  display: flex;
  padding: 10px 16px;
  gap: 12px;
  border-radius: 10px;
  border: 1px solid var(--info-200, #bfd1ff);
  background: var(--info-100, #dfeaff);
  width: 100%;
  .circle {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background-color: ${bgColors.deep};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text {
    color: ${textColors.north};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 500;
    line-height: 1.6;
    flex: 1;
  }
`;

export const SvgWrapper = styled.div`
  //padding: 46px 20px 32px 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const SubContent = styled.div`
  display: flex;
  width: 60%;
  gap: 10px;
`;
export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  padding: 20px 0;
  justify-content: flex-end;
  .save {
    width: 100%;
    height: 44px;
    color: ${textColors.dark};
    border-radius: ${borders.b8};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #ffe866;
  }
  .cancel {
    width: 100%;
    height: 44px;
    color: ${textColors.yourShadow};
    border-radius: ${borders.b8};
    background-color: ${bgColors.wildSand};
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
  }
`;
