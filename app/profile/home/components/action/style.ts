import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  border-radius: 20px;
  background: ${bgColors.white};
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.14);
  padding: 20px;
  margin-top: 20px;

  .title {
    color: ${bgColors.black};
    font-size: ${fontSizes.f14};
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-left: 20px;
  }
  .rows {
    margin-top: 15px;
    .row {
      padding: 23px 0 20px 20px;
      border-bottom: 1px solid ${bgColors.whiteSmoke};
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      .left {
        display: flex;
        gap: 10px;
        align-items: center;
        .inner-title {
          color: ${textColors.soulfulBlue};
          text-align: center;
          font-size: ${fontSizes.f14};
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }
      }
      .right {
      }
      .log-out {
        display: flex;
        gap: 10px;
        .l-title {
          color: ${textColors.pop};
          text-align: center;
          font-size: ${fontSizes.f14};
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
      }
    }
  }
`;
