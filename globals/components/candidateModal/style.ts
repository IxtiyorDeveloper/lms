import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const UploadWrapper = styled.div`
  .dropzone {
    width: 140px;
    margin: 0 auto;
    border-radius: 10px;
  }
`;

export const GenderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label<{ required?: boolean }>`
  font-size: ${fontSizes.f12};
  line-height: 15px;
  position: relative;
  margin-bottom: 10px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
`;

export const BanWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  p {
    font-size: ${fontSizes.f12};
    font-weight: 500;
    color: ${textColors.blueGray};
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  .reject {
    color: ${textColors.white};
  }
`;
export const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;
export const PhoneNumberWrapper = styled.div<{
  type: string;
}>`
  max-width: 335px;
  font-size: 12px;
  color: ${(props) =>
    props.type === "success"
      ? textColors.midori
      : props.type === "info"
      ? textColors.deep
      : textColors.pop};
  font-weight: 500;
  line-height: 20px;
  &.phone {
    font-size: 14px;
  }
`;

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const VacancyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  max-height: 435px;
  overflow-y: auto;
`;
export const VacancyListItem = styled.div`
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 6px;
  background-color: ${bgColors.brilliance};
  border: 0.5px solid ${bgColors.purpleCrystal};
  box-shadow: 0 0 40px 1px rgba(0, 0, 0, 0.02) inset;
  color: ${textColors.sceptreBlue};
  font-size: ${fontSizes.f14};
  font-weight: 500;
  cursor: pointer;
`;

export const SuccessWrapper = styled.div`
  .ant-alert-with-description {
    padding: 12px;
  }
`;
export const AlertWrapper = styled.div`
  position: relative;
  .ant-alert-with-description .ant-alert-message {
    margin-bottom: 2px;
  }
  .ant-alert-with-description {
    padding: 10px;
  }
  .ant-alert-error {
    background: ${bgColors.pinkTheory};
  }
`;
export const LifeCycleWrapper = styled.div<{ type: string }>`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);

  .box {
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    p {
      color: ${(props) =>
        props.type === "success"
          ? textColors.midori
          : props.type === "info"
          ? textColors.deep
          : textColors.dark};
      font-size: ${fontSizes.f10};
      font-weight: 600;
    }
  }
`;
export const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${bgColors.white};
  box-shadow: 0px 2px 4px 0px rgba(252, 173, 169, 0.6);
`;
export const CVWrapper = styled.div`
  .file-upload {
    width: 110px;
  }
`;

export const SourceWrapper = styled.div`
  .box {
    gap: 12px;
    min-width: 135px;
    padding: 16px 0;
  }
  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
  }
`;
