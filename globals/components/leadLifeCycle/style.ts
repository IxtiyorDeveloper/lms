import { bgColors, fontSizes, textColors } from "styles/theme";
import styled from "@emotion/styled";

export const ModalTitle = styled.div`
  margin-bottom: 10px;
  font-size: ${fontSizes.f14};
  line-height: 1.2;
  font-weight: 700;
`;

export const WrapperLifeCycleModal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const RoundedWrapper = styled.div`
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: ${bgColors.brilliance};
  border: 1px solid ${bgColors.whiteSmoke};
  min-height: 400px;
  .segmented-content-wrapper {
    margin-bottom: 16px;
  }
  .text-center {
    text-align: left;
    text-overflow: ellipsis;
    font-style: normal;
    font-weight: 500;
    font-size: ${fontSizes.f10};
    line-height: 12px;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};

    &:nth-of-type(2) {
      color: ${textColors.yourShadow};
      margin-top: 6px;
    }
  }

  .datetime {
    display: flex;
    gap: 8px;
  }
`;
