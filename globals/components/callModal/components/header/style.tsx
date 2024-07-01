import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div`
  color: white;
  border-bottom: 1px solid ${bgColors.sceptreBlue};
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 14px;
  .phone-number {
    width: 200px;
  }

  p {
    font-size: ${fontSizes.f14};
  }

  .action {
    display: flex;
    gap: 6px;
    align-items: center;
    width: 70px;

    p {
      font-size: 14px !important;
      font-weight: 500 !important;
      line-height: 24px !important;
      letter-spacing: -0.01em;
      text-align: center;
    }

    .talk {
      font-family: "Roboto Mono" !important;
      font-size: 12px !important;
      font-weight: 400 !important;
      line-height: 24px !important;
      letter-spacing: -0.01em !important;
      /* text-align: center; */
    }
  }
  .phone-number {
    font-family: "Space Grotesk" !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    line-height: 17.86px !important;
    letter-spacing: -0.01em;
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;

    svg {
      cursor: pointer;
    }
  }
`;
