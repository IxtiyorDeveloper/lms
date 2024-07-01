import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  .container {
    margin-top: 20px;
    padding: 20px;

    .title {
      color: ${textColors.black};
      font-feature-settings: "clig" off, "liga" off;
      font-size: ${fontSizes.f18};
      font-weight: 700;
      line-height: 1.33;
    }

    input {
      margin-top: 22px;
    }

    .flex {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      padding-top: 20px;
    }
  }

  .studentComment {
    margin-top: 22px;
    border-radius: 8px;
    border: 1px solid ${bgColors.purpleCrystal};
    background: ${bgColors.whiteSmoke};
    padding: 8px 10px;
  }
`;
