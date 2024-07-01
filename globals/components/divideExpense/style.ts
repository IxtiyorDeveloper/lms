import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";
import AntdModal from "components/antd/modal/index";

export const AntdModalC = styled(AntdModal)`
  .ant-modal-content {
    padding: 0;
  }

  .flex-head {
    display: flex;
    margin-bottom: 30px;

    h4 {
      width: 100%;
    }
  }
`;

export const ModalTitle = styled.h4`
  padding: 20px 20px 0 20px;
  font-weight: 700;
  font-size: ${fontSizes.f14};
  letter-spacing: -0.01rem;
  color: ${textColors.blueGray};
`;

export const Wrapper = styled.div<{ bgColor?: keyof typeof bgColors }>`
  display: flex;
  align-items: flex-start;
  gap: 7px;
  justify-content: space-between;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ bgColor }) => (bgColor ? bgColors[bgColor] : "")};
  .col {
    width: 30%;
  }
  .col1 {
    width: 33.33%;
  }
  .col:nth-of-type(4) {
    width: 10%;
  }
  img {
    height: 30px;
    width: 30px;
    border-radius: 50%;
  }

  .suffix {
    font-weight: 600;
  }

  .green {
    color: ${textColors.midori};
  }

  .currency {
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 18px;
    background: #ffffff;
    border: 1px solid ${bgColors.purpleCrystal};
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    border-radius: ${borders.b6};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 20px;
`;

export const FormWrapper = styled.div<{ last?: boolean; pb?: number }>`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 0 20px;
  width: 100%;
  margin-bottom: 20px;
  padding-bottom: ${({ pb }) => (pb ? pb : 0)}px;

  & .svg svg {
    margin-top: 15px;
  }

  ${({ last }) =>
    last &&
    css`
      padding-bottom: 40px;
      border-bottom: 1px solid ${bgColors.whiteSmoke};
    `}
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 8px;

    .plus {
      margin-bottom: 5px;
    }
  }
`;
export const Col = styled.div`
  display: flex;
  gap: 5px;
  .number {
    width: 100% !important;
  }
  .tree {
    width: 100% !important;
  }
  .select {
    width: calc(100% - 35px) !important;
  }
`;
