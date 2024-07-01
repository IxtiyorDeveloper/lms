import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Container = styled.div``;
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 12px 0;
  color: ${textColors.paleSky};
  font-size: ${fontSizes.f10};
  font-style: normal;
  font-weight: 500;
  line-height: 12px; /* 120% */
  letter-spacing: -0.1px;
  .left {
    display: flex;
    width: 50%;
    align-items: center;
    .calendar {
      width: 10%;
      .abs {
        position: absolute;
        width: 20px;
        height: 20px;
        opacity: 0;
      }
    }
    .teacher {
      width: 30%;
    }
    .group {
      width: 20%;
    }
    .desc {
      width: 30%;
    }
    .amount {
      width: 40%;
      gap: 8px;
      display: flex;
      span {
        color: ${bgColors.pop};
        font-weight: 600;
      }
    }
  }
  .right {
    display: flex;
    width: 50%;
    align-items: center;
    .teacher {
      width: 30%;
    }
    .group {
      width: 20%;
    }
    .desc {
      width: 20%;
    }
    .amount {
      width: 30%;
      gap: 8px;
      display: flex;
      span {
        color: ${bgColors.midori};
        font-weight: 600;
      }
    }
  }
`;
