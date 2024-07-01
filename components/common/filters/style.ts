import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

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
  max-width: 260px;
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

export const Wrapper = styled.div`
  .search {
    padding-top: 24px;
  }
  .col-end {
    display: flex;
    align-items: flex-end;
  }
  .checkbox {
    display: flex;
    align-items: center;
  }
`;

export const FullWidth = styled.div`
  width: 100%;
`;
