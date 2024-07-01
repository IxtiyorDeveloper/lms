import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div`
  overflow-x: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 12px 12px 0 0;
  background: ${bgColors.white};
  border-bottom: 1px solid ${bgColors.whiteSmoke};

  .form-element {
    min-width: 150px;
  }

  .title {
    font-size: ${fontSizes.f14};
    font-weight: 700;
  }

  .filter {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    justify-content: flex-end;
  }
`;

export const FormWrapper = styled.form`
  overflow-x: auto;
`;
