import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const ModalTitle = styled.h4`
  padding: 20px 20px 10px 20px;
  font-weight: 700;
  font-size: ${fontSizes.f14};
  letter-spacing: -0.01rem;
  color: ${textColors.blueGray};
`;

export const PhoneTypes = styled.div`
  padding: 10px;
  width: 100%;
  background-color: ${bgColors.brilliance};
  border-radius: 12px;

  .circle {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ddfadc;
    box-shadow: inset 0 0 2px #baf7bc;

    & img {
      height: 28px;
      width: 28px;
    }
  }

  .circle-parents {
    background: #fae0c1;
    box-shadow: inset 0 0 2px #e0bb8e;
  }

  .circle-home {
    background: #eee5cc;
    box-shadow: inset 0 0 2px #e4ca7c;
  }

  .circle-other {
    background: #fdd5d6;
    box-shadow: inset 0 0 2px #f5a0a1;
  }
`;

export const SegmentedWrapper = styled.div`
  padding-left: 16px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 0;
  margin-bottom: 10px;
  min-height: 400px;

  .content-d {
    margin-top: 22px;
    width: 100%;

    & .title {
      font-size: ${fontSizes.f12};
      font-weight: 700;
      margin-bottom: 8px;
    }
  }
`;

export const LabelWrapperSegmented = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const BodyWrapper = styled.div`
  padding-bottom: 150px;

  .ant-dropdown-trigger {
    height: 34px !important;
  }

  .chosen {
    background-color: ${bgColors.pop};
    color: ${textColors.white};
    border: 2px solid transparent;
  }
`;

export const Wrapper = styled.div<{ paddingX?: number }>`
  width: 100%;
  padding: ${(props) => props.paddingX}px;

  .suffix {
    font-weight: 600;
    color: ${textColors.yourShadow};
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
  padding: 16px 20px 20px 20px;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  background: ${bgColors.brilliance};
  border-top: 1px solid ${bgColors.whiteSmoke};
`;

export const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
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

export const FormWrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 14px;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AmountWrapper = styled.p`
  font-size: ${fontSizes.f14};
  font-weight: 700;
  color: ${textColors.sceptreBlue};
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 20px 20px 24px;
  gap: 20px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  color: ${textColors.yourShadow};
`;
