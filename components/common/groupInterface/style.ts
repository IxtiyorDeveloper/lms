import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Container = styled.div`
  padding: 14px 12px;
  background: ${bgColors.brilliance};
  border: 1px solid ${bgColors.whiteSmoke};
  border-radius: 10px;
  .row {
    display: flex;
    gap: 7px;
    margin-top: 12px;
    align-items: center;
    .name {
      font-weight: 700;
      font-size: ${fontSizes.f12};
      line-height: 1.2;
      color: ${textColors.blueGray};
    }
  }
  .line {
    width: 100%;
    opacity: 0.2;
    background: ${bgColors.brotherBlue};
    height: 0.5px;
  }
  .mt17 {
    margin-top: 17px;
  }
  .mt10 {
    margin-top: 10px;
  }
  .comment {
    font-weight: 500;
    font-size: ${fontSizes.f10};
    line-height: 1.6;
    letter-spacing: -0.01em;
    color: ${textColors.blueGray};
    background: ${bgColors.whiteSmoke};
    border-radius: 5px;
    padding: 8px;
    margin-top: 10px;
  }
`;

export const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 8px;
  .name {
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 1.2;
    color: ${textColors.blueGray};
  }
  .date {
    font-weight: 500;
    font-size: ${fontSizes.f10};
    line-height: 1.6;
    letter-spacing: -0.01em;
    color: ${textColors.yourShadow};
  }
  .status {
    font-weight: 800;
    font-size: ${fontSizes.f10};
    line-height: 14px;
    letter-spacing: -0.01em;
    color: ${textColors.white};
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 2px 4px;
    border-radius: ${borders.b4};
  }
  .badge {
    font-weight: 700;
    font-size: ${fontSizes.f10};
    line-height: 10px;
    letter-spacing: -0.01em;
    color: ${textColors.brilliance};
    order: 0;
    flex-grow: 0;
    padding: 0 6px;
    background: ${bgColors.pop};
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const TripleBox = styled.div`
  display: flex;
  gap: 10px;
  .box {
    padding: 10px 0;
    background: ${bgColors.whiteSmoke};
    border-radius: 5px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      font-weight: 600;
      font-size: ${fontSizes.f12};
      line-height: 1.2;
      letter-spacing: -0.01em;
      color: ${textColors.blueGray};
    }
  }
`;
