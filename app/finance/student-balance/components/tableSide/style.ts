import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const TableWrapper = styled.div`
  padding: 20px 0 0 0;
  background-color: ${bgColors.white};
  border: 1px solid ${bgColors.purpleCrystal};
  border-radius: 14px;

  .thin-tab {
    padding: 20px;
    .ant-segmented {
      width: 100% !important;
      .ant-segmented-group {
        width: 100% !important;

        .ant-segmented-item {
          flex: 1 !important;
        }
      }
    }
  }

  .badge-wrap {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;

    .total-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      color: ${textColors.dark};
      font-family: Manrope;
      font-size: ${fontSizes.f12};
      font-weight: 700;
      line-height: 16px;
      letter-spacing: -0.12px;

      .dollar {
        border-radius: 50%;
        border: 2px solid ${bgColors.midori};
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: center;
      }
    }
  }
`;

export const ChildWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .badge {
    background-color: ${bgColors.pop};
    padding: 0 4px;
    border-radius: 20px;
    color: ${textColors.white};
    margin-left: 20px;
    height: fit-content;
    line-height: 1.5;
    font-size: ${fontSizes.f14};
  }
`;
