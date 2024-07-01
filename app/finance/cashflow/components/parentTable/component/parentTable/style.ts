import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  .ant-table-content {
    padding: 8px 8px 0 8px !important;
  }

  .ant-table-expanded-row {
    .ant-table-cell {
      padding: 0 !important;
      background: transparent !important;
    }
  }
  .desc {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .name {
    color: ${textColors.sceptreBlue};
    font-size: ${fontSizes.f10};
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.1px;
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
