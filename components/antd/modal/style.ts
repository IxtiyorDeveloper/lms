import styled from "@emotion/styled";
import Modal from "antd/lib/modal";
import { fontSizes, textColors } from "styles/theme";

export const StyledModal = styled(Modal)<{ padding: string }>`
  .ant-modal-title {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
    margin-bottom: 20px;
  }
  .ant-modal-content {
    padding: ${(props) => props.padding};
  }
  .ant-modal-body {
    &::-webkit-scrollbar {
    }
  }
`;
