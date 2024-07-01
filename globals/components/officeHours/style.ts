import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div``;
export const Flex = styled.div`
  color: ${textColors.blueGray};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 166.667% */
  letter-spacing: -0.12px;
`;

export const LifeCycleWrapper = styled.div`
  padding: 20px;

  .top {
    display: flex;
    gap: 12px;

    .title {
      color: ${textColors.sceptreBlue};
      font-size: ${fontSizes.f14};
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.14px;
    }

    .time {
      color: ${textColors.soulfulBlue};
      font-size: ${fontSizes.f12};
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.12px;
    }
  }

  .lifecycle-table {
    max-height: 400px;
    overflow-y: auto;
    margin-top: 20px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding-top: 20px;
`;
