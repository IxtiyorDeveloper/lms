import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const CreateGroupWrapper = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
export const ContentWrapper = styled.div`
  border-radius: ${borders.b6};
  box-shadow: 0 40px 64px -12px rgba(0, 0, 0, 0.08),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 32px 48px -8px rgba(0, 0, 0, 0.1);
  border: 0.5px solid ${bgColors.purpleCrystal};
  padding: 5px;
  .spl {
    margin-top: 5px;
    .line {
      margin: 10px 0;
      background: ${bgColors.whiteSmoke};
      width: 100%;
      height: 1px;
    }
  }
`;
export const TextAreaWrapper = styled.div`
  font-family: "Inter", sans-serif;
  margin-top: 10px;
  background: ${bgColors.brilliance};
  box-shadow: inset 0 0 20px rgba(244, 245, 246, 0.8);
  border-radius: ${borders.b2};
  padding: 10px;
  min-height: 40px;
  font-size: ${fontSizes.f12};
  line-height: 12px;
  letter-spacing: -0.01em;
  .placeholder {
    color: ${textColors.brotherBlue};
  }
`;
export const InnerWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 5px;
`;
export const Box = styled.div`
  padding: 10px 0;
  width: 100%;
  background: ${bgColors.brilliance};
  box-shadow: inset 0 0 20px rgba(244, 245, 246, 0.8);
  border-radius: ${borders.b2};
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: ${fontSizes.f10};
    line-height: 12px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
    margin-top: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding: 0 4px;
  }
  .text {
    width: 100%;
    text-align: center;
    font-weight: 500;
    font-size: ${fontSizes.f10};
    line-height: 14px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
    margin-top: 5px;
    padding: 0 4px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const GenderBox = styled.div`
  padding: 6px;
  width: 100%;
  background: ${bgColors.brilliance};
  box-shadow: inset 0 0 20px rgba(244, 245, 246, 0.8);
  border-radius: ${borders.b2};
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    gap: 8px;
    align-items: center;
    .g-t {
      color: ${textColors.blueGray};
      font-size: ${fontSizes.f10};
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.1px;
    }
  }
  .count {
    color: ${textColors.yourShadow};
    font-size: ${fontSizes.f10};
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.1px;
  }
`;
