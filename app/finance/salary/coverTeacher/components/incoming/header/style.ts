import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

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

    .teacher {
      width: 20%;
    }

    .group {
      width: 20%;
    }

    .desc {
      width: 20%;
    }

    .amount {
      width: 20%;
      span {
        color: ${textColors.pop};
        font-weight: 600;
      }
    }

    .date {
      display: flex;
      gap: 8px;
      width: 20%;
      align-items: center;
      margin-left: 20px;
    }
  }

  .right {
    display: flex;
    width: 50%;
    align-items: center;
    margin-left: 40px;

    .teacher {
      width: 20%;
    }

    .group {
      width: 20%;
    }

    .desc {
      width: 20%;
    }

    .amount {
      width: 20%;
      span {
        color: ${textColors.midori};
        font-weight: 600;
      }
    }

    .date {
      display: flex;
      gap: 8px;
      margin-left: 20px;
      width: 20%;
      align-items: center;
    }
  }
`;
