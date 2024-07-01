import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div``;

export const Inner = styled.div<{ borderColor: string }>`
  margin-top: 10px;
  border-radius: 10px;
`;

export const Label = styled.label<{ required: boolean }>`
  font-size: ${fontSizes.f12};
  position: relative;
  color: ${textColors.dark};
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.01em;
`;
export const Content = styled.div`
  background: transparent;
  border-radius: ${borders.b6};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 4px;
`;
export const BigBox = styled.div`
  height: 100%;
  .error {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }
`;
export const Box = styled.div`
  background: ${bgColors.brilliance};
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.06);
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 40px 16px 24px 16px;
  position: relative;
  overflow: hidden;
  min-width: 150px;
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  max-width: 230px;
  height: 100%;
  .title {
    font-weight: 500;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }

  .count {
    padding: 2px 7px;
    background: ${bgColors.pepper};
    border-radius: 40px;
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.white};
    margin: 4px 0;
  }

  .empty {
    padding: 2px 7px;
    background: ${bgColors.midori};
    border-radius: 40px;
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.white};
    margin: 4px 0;
  }
  .emptyHeight {
    height: 21px;
    margin: 4px 0;
  }

  .abs {
    position: absolute;
    height: 4px;
    background: #6084ff;
    border-radius: 2px;
    bottom: 5px;
    left: 5px;

    width: calc(100% - 10px);
  }
  .list {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 10px;
    //margin-top: 17px;
    width: 100%;
    height: 100%;
    //background: green;
    .lessons {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      .left {
        display: flex;
        gap: 10px;
        align-items: center;
        .text {
          color: ${textColors.blueGray};
          text-align: center;
          font-size: ${fontSizes.f12};
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          letter-spacing: -0.12px;
        }
      }
      .ant-tag {
        font-size: ${fontSizes.f12}!important;
        border-radius: 20px;
        background: ${bgColors.sadet};
        color: ${textColors.brilliance};
        text-align: center;
        font-style: normal;
        letter-spacing: -0.12px;
        line-height: 1;
        border: none !important;
        padding: 3px 5px;
      }
      .date-text {
        color: ${textColors.blueGray};
        text-align: center;
        font-size: ${fontSizes.f12};
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.12px;
      }
    }
  }
  .dates {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.5;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};
    margin-top: 6px;
  }
`;
export const TypeContent = styled.div`
  background: transparent;
  border-radius: ${borders.b6};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 4px;
  grid-auto-rows: 1fr;
`;
