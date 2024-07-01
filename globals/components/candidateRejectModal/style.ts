import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const ModalHeader = styled.div``;
export const Title = styled.div`
  padding: 10px 20px;
  border-radius: 12px 14px 0 0;
  color: ${textColors.white};
  font-size: ${fontSizes.f14};
  font-weight: 600;
  background: linear-gradient(
    90deg,
    ${bgColors.pop} 3.78%,
    ${bgColors.pepper} 97.67%
  );
`;

export const CandidateInfo = styled.div`
  border-radius: 0 0 12px 12px;
  padding: 20px;
  background: ${bgColors.whiteSmoke};
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.15) inset;
  .col_left {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .col_right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
export const ActionsWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const FormWrapper = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const FormWItemrapper = styled.form`
  .switch-wrapper {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: flex-end;
    gap: 10px;
  }
  label {
    margin: 0;
  }
`;
export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  margin-top: 120px;
  border-style: solid;
  border-width: 1px 0 0 0;
  border-color: ${bgColors.whiteSmoke};
`;
