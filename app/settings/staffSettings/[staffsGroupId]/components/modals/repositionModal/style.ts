import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { AntdModal } from "components";

export const AntdModalWrapper = styled(AntdModal)`
  & .ant-modal-content {
    border-radius: 16px !important;
  }

  .last {
    margin-bottom: 60px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 20px 12px 20px;
`;

export const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px;
  border-radius: 20px;
  box-shadow: 0 0 2px 0 #00000040 inset;
`;

export const Title = styled.h1`
  font-size: ${fontSizes.f14};
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01rem;
`;

export const Info = styled.p`
  font-size: ${fontSizes.f12};
  font-weight: 500;
  line-height: 1.2;
`;

export const ItemWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  padding: 0 20px;
`;

export const Flex = styled.div`
  display: flex;
  gap: 10px;
  padding: 0 20px;

  .file-item {
    padding: 0;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${bgColors.brilliance};
  border-top: 1px solid ${bgColors.whiteSmoke};
  padding: 20px;
  border-radius: 0 0 16px 16px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  .btn-secondary {
    background-color: ${bgColors.wildSand};
    color: ${textColors.yourShadow};
  }
`;
