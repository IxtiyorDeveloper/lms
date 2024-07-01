import styled from "@emotion/styled";
import { bgColors, textColors } from "../../../styles/theme";
export const Wrapper = styled.div``;
export const Title = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.01em;
  color: #353945;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 20px;
  background: #f4f5f6;
  box-shadow: inset 0px 0px 45px rgba(0, 0, 0, 0.02);
  border-radius: 10px;
  margin-top: 20px;
  .file-wrapper {
    background: ${bgColors.white}!important;
    width: 100%;
  }
`;
export const BoxTitle = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
`;
export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 60px;
`;
export const Flex = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;
export const Repeat = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;

  .switch-wrapper {
    label {
      margin-bottom: 0;
    }
  }

  .switch-wrapper {
    flex-direction: row;
    gap: 8px;
    align-items: center;
  }
`;
