import styled from "@emotion/styled";
import { fontSizes } from "styles/theme";

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  .title {
    font-size: ${fontSizes.f14};
    font-weight: 700;
    line-height: 1.2;
  }

  form {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }

  .flex {
    display: flex;
    grid-column: 2;
    gap: 14px;
    align-items: flex-end;
    width: 100%;

    .end {
      display: flex;
      gap: 14px;
      align-items: flex-end;
      align-self: flex-end;
      justify-content: flex-end;
      margin-left: auto;
      width: 100%;
    }
  }
`;
