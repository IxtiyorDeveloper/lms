import styled from "@emotion/styled";
import { bgColors, borders } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  gap: 10px;

  .sider {
    width: 300px;
    height: fit-content;
    .ant-affix {
      max-height: 80vh !important;
      overflow-y: auto !important;

      &::-webkit-scrollbar {
        width: 6px !important;
        background-color: ${bgColors.whiteSmoke};
        box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        cursor: pointer !important;
        margin-left: 10px;
      }

      &::-webkit-scrollbar-thumb {
        border: 1px solid ${bgColors.yourShadow};
        border-radius: 4px;
        background-color: ${bgColors.harrison};
        background-size: 12px 5px;
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer !important;
        margin-left: 10px;
      }
    }
  }

  .content {
    background: ${bgColors.white};
    width: 100%;
    border-radius: ${borders.b10};
    overflow: hidden;
    padding: 16px;

    .steps {
      background: ${bgColors.whiteSmoke};
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 80px 0;
      border-radius: 8px;
    }
  }
`;
