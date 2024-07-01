import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div``;

export const Box = styled.div`
  margin-top: 40px;
  padding: 10px 10px 12px 10px;
  gap: 20px;
  border-radius: 8px;
  border: 1px solid ${bgColors.purpleCrystal};
  background: ${bgColors.brilliance};
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.05);

  .ant-input-number-group-wrapper {
    background: ${bgColors.white} !important;

    input {
      background: ${bgColors.white} !important;
    }
  }
`;
export const SubContent = styled.div`
  padding-inline: 20px;
`;
export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const Flex = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;
export const RadioWrapper = styled.div`
  width: 100%;

  .container {
    background-color: ${bgColors.white}!important;
  }
`;
export const ContentItem = styled.div`
  margin-top: 20px;
`;
