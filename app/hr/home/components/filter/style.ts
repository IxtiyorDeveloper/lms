import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const FormWrapper = styled.div`
  background: ${bgColors.brilliance};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 20px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;
  gap: 14px;
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;
  gap: 14px;
  width: 100%;
  max-width: 220px;
  .reset {
    height: 40px;
    color: ${bgColors.yourShadow};
    background: ${bgColors.wildSand};
    &:hover {
      color: ${bgColors.yourShadow};
      background: ${bgColors.wildSand};
    }
  }
  .submit {
    height: 40px;
  }
`;
