import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  margin-bottom: 14px;

  .title-table {
    padding: 12px;
    background: ${bgColors.brilliance};
    font-size: ${fontSizes.f12};
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .count {
    font-weight: 500;
  }
`;

export const AmountW = styled.div`
  background: ${bgColors.midori};
  color: ${textColors.white};
  border-radius: 6px;
  padding: 4px 10px;
  width: fit-content;
`;

export const Flex = styled.div`
  padding: 20px;
  overflow-x: scroll;

  .groups {
    display: flex;
    gap: 20px;
  }

  .center {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
