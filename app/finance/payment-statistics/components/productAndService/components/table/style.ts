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

  .name {
    display: flex;
    align-items: center;
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f14};
    font-weight: 600;
    letter-spacing: -0.14px;
    gap: 12px;
    padding: 16px 0 16px 16px;

    .title {
      margin-left: 8px;
    }

    .index {
      color: ${textColors.sceptreBlue};
      font-size: ${fontSizes.f12};
      letter-spacing: -0.12px;
      width: auto;
    }
  }
`;

export const AmountW = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  .amounts {
    background: ${bgColors.midori};
    color: ${textColors.white};
    border-radius: 6px;
    padding: 4px 10px;
    min-width: 140px;
    text-align: center;
  }
`;

export const Arrow = styled.div<{ isOpen: boolean }>`
  transition: 0.3s;
  transform: rotate(${(props) => (props.isOpen ? "-0" : "-90")}deg);
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
