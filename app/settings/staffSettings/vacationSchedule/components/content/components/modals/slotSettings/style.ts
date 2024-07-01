import styled from "@emotion/styled";
import { AntdModal } from "components";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const CustomAntModal = styled(AntdModal)`
  .ant-modal-content {
    padding: 0;
    border-radius: 16px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
`;

export const ModalBody = styled.div`
  padding: 0 20px 12px 20px;

  .ant-segmented {
    width: 100%;

    & label {
      width: 100%;
    }
  }

  .ant-segmented-item-label {
    padding: 0 8.9px !important;
    min-height: 34px !important;
  }

  .ant-segmented-item {
    color: ${textColors.soulfulBlue} !important;
  }

  .ant-segmented-item-selected {
    color: ${textColors.dark} !important;

    .identification {
      background-color: ${bgColors.dark} !important;
    }
  }
`;

export const BodySide = styled.div`
  min-height: 400px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  align-items: center;
  padding: 12px 20px;
  background-color: ${bgColors.brilliance};
  border-top: 1px solid #f4f5f6;
  border-radius: 0 0 16px 16px;

  .btn-secondary {
    color: ${textColors.yourShadow};
    background-color: ${bgColors.wildSand};
  }
`;

export const TitleModal = styled.div`
  font-size: ${fontSizes.f14};
  font-weight: 700;

  & > span:last-of-type {
    color: ${textColors.sadet};
  }
`;

export const MonthTab = styled.div`
  position: relative;
`;

export const Identification = styled.div`
  position: absolute;
  left: 50%;
  height: 4px;
  top: 8%;
  width: 4px;
  border-radius: 50%;
  background-color: ${bgColors.sadet};
`;
