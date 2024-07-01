import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";
import AntdModal from "components/antd/modal/index";

export const WrapperLabel = styled.div`
  display: flex;
  width: 100%;
  gap: 5px;
  align-items: stretch;
  .content {
    flex: 1;
    display: flex;
    align-items: stretch;
    justify-content: space-between;

    gap: 5px;

    .opt-item {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
`;
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
export const DateWrapper = styled.div`
  padding: 20px 20px;
  width: fit-content;
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

  .image-custom {
    height: 40px;
    width: 40px;
    position: relative;
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

  .left {
    width: 100%;

    .ant-input-number .ant-input-number-input {
      color: ${textColors.red} !important;
    }
  }

  .right {
    width: 100%;

    .ant-input-number .ant-input-number-input {
      color: ${textColors.midori} !important;
    }
  }

  .sms {
    display: flex;
    align-items: center;
    padding: 0 4px;
    cursor: pointer;
    margin-top: 10px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 20px;
  margin-top: 50px;
`;

export const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

export const PriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 6px;
  color: ${textColors.white};
  font-size: ${fontSizes.f14};
  font-weight: 600;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Group = styled.div`
  border: 0.5px solid ${bgColors.purpleCrystal};
  background: #fcfcfd;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & p {
    font-weight: 500;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    text-align: center;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
    margin-top: 8px;
  }
`;

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 9px;
  margin-bottom: 9px;
  font-weight: 500;
  font-size: ${fontSizes.f14};
`;

export const FormWrapper = styled.div<{ last?: boolean; pb?: number }>`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 0 20px;
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

export const AmountWrapper = styled.p`
  font-size: ${fontSizes.f14};
  font-weight: 700;
  color: ${textColors.sceptreBlue};
`;

const linearObj = {
  red: "linear-gradient(90deg, #E92857 0%, #F87C84 106.67%)",
  blue: "linear-gradient(90deg, #6084FF 0%, #A0B8FF 106.87%)",
  orange: "linear-gradient(90deg, #FA791D 0%, #FDBF76 105.42%)",
};

export const TitleWrapper = styled.div<{
  color: "red" | "blue" | "orange";
  m?: string;
}>`
  margin: ${({ m }) => (m ? m : "0 20px")};
  padding: 4px 6px;
  background: ${({ color }) => linearObj[color]};
  font-size: ${fontSizes.f12};
  line-height: 1rem;
  border-radius: 4px;
  color: ${textColors.white};
  font-weight: 600;
`;

export const StyledContent = styled.div<{ p?: string }>`
  border-radius: 16px;
  background: ${bgColors.white};
  box-shadow: 0 32px 48px -8px rgba(0, 0, 0, 0.1),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 40px 64px -12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  .title {
    color: ${textColors.sceptreBlue};
    font-size: ${fontSizes.f14};
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.14px;
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
    max-height: 350px;
    height: auto;
    overflow-y: auto;
  }
`;

export const StyledContentForMain = styled.div<{ p?: string }>`
  .container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

export const MainDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 400px;
  overflow-y: auto;
  padding: 20px;
  box-shadow: 0 32px 48px -8px rgba(0, 0, 0, 0.1),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 40px 64px -12px rgba(0, 0, 0, 0.08);

  .title {
    color: ${textColors.sceptreBlue};
    font-size: ${fontSizes.f14};
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.14px;
  }
`;
