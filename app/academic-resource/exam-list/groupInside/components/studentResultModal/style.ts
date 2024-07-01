import styled from "@emotion/styled";
import { Modal } from "antd";
import { textColors } from "styles/theme";

export const ModalWrapper = styled(Modal)`
  .ant-modal-close {
    top: 40px !important;
  }
  .ant-modal-body {
    max-height: 72vh;
    overflow-x: hidden;
    overflow-y: auto !important;
    ::-webkit-scrollbar {
      width: 0px;
      display: none;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 50px;
      border: 0 solid transparent;
    }
  }
`;

export const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  .name {
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: 0em;
    text-align: left;
    color: ${textColors.black};
  }
  .level {
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
    letter-spacing: 0em;
    text-align: left;
    color: ${textColors.yourLighter};
  }
`;

export const CollapseHeader = styled.div`
  line-height: 24px;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  color: ${textColors.sceptreBlue};
  .count {
    min-width: 24px;
    height: 24px;
    border-radius: 100px;
    color: ${textColors.white};
    background: ${textColors.pop};
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    right: 48px;
  }
`;
