import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const EducationWrapper = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};

  .text {
    margin-top: 30px;
    margin-bottom: 24px;
  }
`;

export const EducationForm = styled.div`
  position: relative;
  padding: 20px;
  border-radius: 12px;
  background-color: ${bgColors.brilliance};
  box-shadow: 0 0 10px 0 #0000000a inset;
  margin-bottom: 20px;
`;

export const EducationTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
