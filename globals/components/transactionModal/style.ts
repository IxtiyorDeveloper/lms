import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const ModalTitle = styled.h4`
  padding: 20px;
  font-weight: 700;
  font-size: ${fontSizes.f14};
  letter-spacing: -0.01rem;
  color: ${textColors.blueGray};
`;

// export const InfoDeviceIntegration = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   font-weight: 500;
//   font-size: ${fontSizes.f12};
//   padding: 10px 16px;
//   border: 1px solid ${bgColors.pearl};
//   background-color: ${bgColors.transparentGreen};
//   color: ${textColors.lucky};
//   border-radius: 10px;
//   margin: 10px 20px;
// `;
//
// export const InfoDeviceIntegrationFailed = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   font-weight: 500;
//   font-size: ${fontSizes.f12};
//   padding: 10px 16px;
//   border: 1px solid ${bgColors.peach};
//   background-color: ${bgColors.pale};
//   color: ${textColors.plum};
//   border-radius: 10px;
//   margin: 10px 20px;
//
//   .bg {
//     background-color: ${bgColors.pop};
//     min-width: 34px;
//     height: 34px;
//   }
// `;
//
// export const IconCheckWrapper = styled.div`
//   width: 34px;
//   height: 34px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 50%;
//   background-color: ${bgColors.midori};
// `;

export const Wrapper = styled.div<{ paddingX?: number }>`
  width: 100%;
  padding: ${(props) => props.paddingX}px;

  .suffix {
    font-weight: 600;
    color: ${textColors.yourShadow};
  }
  .m-s {
    padding-inline: 20px;
  }
`;

export const InfoDeviceIntegration = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  padding: 10px 16px;
  border: 1px solid ${bgColors.pearl};
  background-color: ${bgColors.transparentGreen};
  color: ${textColors.lucky};
  border-radius: 10px;
  margin: 10px 20px;
`;

export const InfoDeviceIntegrationFailed = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  padding: 10px 16px;
  border: 1px solid ${bgColors.peach};
  background-color: ${bgColors.pale};
  color: ${textColors.plum};
  border-radius: 10px;
  margin: 10px 20px;

  .bg {
    background-color: ${bgColors.pop};
    min-width: 34px;
    height: 34px;
  }
`;

export const IconCheckWrapper = styled.div`
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${bgColors.midori};
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
  padding: 20px;
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
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px 10px 20px 0;
  gap: 20px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  color: ${textColors.yourShadow};
`;

export const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: ${fontSizes.f12};
  align-items: flex-start;
  flex: 1;
  width: 100%;
  .full-name-student-card {
    font-size: ${fontSizes.f14};
    &.p {
      padding: 5px 0;
    }
  }
`;

export const PhotoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${bgColors.whiteSmoke};
  height: 80px;
  width: 80px;
  border-radius: 50%;
`;

export const Card = styled.div<{ isActive?: boolean }>`
  background: ${bgColors.white};
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isActive
      ? "rgba(0, 0, 0, 0.35) 0 5px 15px;"
      : "rgba(0, 0, 0, 0.24) 0 3px 8px"};
  width: 130px;
  border-radius: 8px;
  border: ${(props) =>
    !props.isActive ? "2px dashed transparent" : "2px dashed #FFCF00"};
  backdrop-filter: ${(props) => (!props.isActive ? "unset" : "blur(16px)")};
  height: fit-content;
`;

export const CardImageWrapper = styled.div`
  background: ${bgColors.coronation};
  border-radius: 8px;
  overflow: hidden !important;
`;

export const CardBody = styled.div`
  padding: 10px 8px;
  & h4 {
    font-size: ${fontSizes.f16};
    font-weight: 700;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
    color: ${textColors.blueGray};
  }
  .price {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    display: flex;
    align-items: center;
    color: ${textColors.blueGray};
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
  }
`;
