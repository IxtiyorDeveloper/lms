import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  min-height: 400px;
  margin-top: 20px;
`;

export const SlotWrapper = styled.div`
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 12px;
  background-color: ${bgColors.wildSand};
  box-shadow: 0 0 45px 0 #00000005 inset;

  .ant-picker,
  .ant-select-selector {
    background-color: #fff !important;
  }

  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;

    .title-text {
      font-size: ${fontSizes.f14};
      color: ${textColors.sceptreBlue};
      font-weight: 700;
      line-height: 20px;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .form-side {
    display: flex;
    gap: 8px;
  }
`;

export const InitialCreateContent = styled.div`
  min-height: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const CreateButton = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 14px;
  transition: 0.3s ease;
  padding: 5px 10px;
  border-radius: 8px;

  &:hover {
    background-color: ${bgColors.transparentGreen}50;
  }
`;

export const CreateLabel = styled.p`
  font-size: ${fontSizes.f14};
  font-weight: 700;
  margin: 4px 0;
  color: ${textColors.midori};
`;

export const ExtraInfo = styled.p`
  color: ${textColors.sadet};
  font-size: ${fontSizes.f12};
  font-weight: 500;
`;
