import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  margin: 20px 40px 0 40px;
  border-radius: 12px;
  background: ${bgColors.white};
  box-shadow: 0 0 14px -4px #0000000d;

  .ant-segmented {
    background: ${bgColors.transparent};

    & label,
    & .ant-segmented {
      width: 100%;
    }
  }

  .ant-segmented-thumb {
    background: ${bgColors.transparent};
    box-shadow: none;
  }

  .ant-segmented-item {
    width: 100%;
    background-color: ${bgColors.transparent};
    box-shadow: none !important;

    .text {
      color: ${textColors.yourShadow};
    }
  }

  .ant-segmented-item-selected {
    background-color: ${bgColors.transparent};
    box-shadow: none !important;

    .text {
      color: ${textColors.dark};
    }
  }

  .content {
    padding: 20px 10px;

    &.support {
      margin-top: 20px;
    }
  }
`;

export const CardTopSide = styled.div`
  border: 1px solid ${bgColors.purpleCrystal};
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  background: ${bgColors.brilliance};
  border-radius: 12px 12px 0 0;
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
