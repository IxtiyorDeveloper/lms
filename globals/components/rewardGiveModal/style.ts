import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;
export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 10px;
  margin-top: 60px;
  border-style: solid;
  border-width: 1px 0 0 0;
  border-color: ${bgColors.whiteSmoke};
`;
