import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div``;
export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  .hour {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 12px;
    letter-spacing: -0.01em;
    color: ${textColors.yourShadow};
  }
`;

export const LifeCycleWrapper = styled.div`
  padding: 20px;

  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .lifecycle-table {
    max-height: 400px;
    overflow-y: auto;
    margin-top: 20px;
  }
`;
