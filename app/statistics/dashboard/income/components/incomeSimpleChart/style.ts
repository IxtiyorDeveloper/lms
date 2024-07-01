import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Col = styled.div`
  width: 100%;
  .product {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 30px;
  }
`;
export const CWr = styled.div`
  .name {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1;
    letter-spacing: -0.01em;
    color: ${textColors.brotherBlue};
  }
  .minWidth300 {
    min-width: 300px;
  }
`;
export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 9px;
  }
  .price {
    font-weight: 700;
    font-size: ${fontSizes.f12};
    line-height: 1;
    letter-spacing: -0.01em;
    color: ${textColors.brilliance};
    margin-top: 4px;
  }
`;
export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
