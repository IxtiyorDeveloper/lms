import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div`
  .flex {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .date1 {
    color: ${bgColors.sceptreBlue};
    font-size: ${fontSizes.f10};
    font-weight: 500;
    letter-spacing: -0.1px;
  }

  .date2 {
    color: ${bgColors.soulfulBlue};
    font-size: ${fontSizes.f10};
    font-weight: 500;
    letter-spacing: -0.1px;
    margin-top: 6px;
  }

  .coin {
    color: ${bgColors.pop};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.12px;
  }

  .green {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.12px;
    color: ${bgColors.midori};
  }
  .red {
    color: ${bgColors.pop};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.12px;
  }
`;
