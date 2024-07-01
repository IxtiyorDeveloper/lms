import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const TitleModal = styled.h2`
  font-size: ${fontSizes.f16};
  font-weight: 700;
  margin-bottom: 20px;
`;

export const FormItem = styled.div`
  margin-bottom: 20px;
`;

export const BtnsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;

  .colorPicker-btn {
    background-color: ${bgColors.purpleCrystal};
  }

  .cancel-btn {
    background-color: ${bgColors.purpleCrystal};
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
