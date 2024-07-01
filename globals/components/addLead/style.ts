import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 520px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  padding: 20px;
  background: ${bgColors.white};
  box-shadow: 0 40px 64px -12px rgba(0, 0, 0, 0.08),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 32px 48px -8px rgba(0, 0, 0, 0.1);
  border-radius: ${borders.b10};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .button {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    &.eRow {
      padding-bottom: 24px;
    }
  }
`;

export const Alert = styled.div`
  background: ${bgColors.lemon};
  box-shadow: inset 0 0 4px ${bgColors.daisy};
  border-radius: 6px;
  padding: 12px;
  font-style: normal;
  font-weight: 600;
  font-size: ${fontSizes.f12};
  line-height: 20px;
  letter-spacing: -0.01em;
  color: ${textColors.blackFire};
  margin-top: 20px;
  display: flex;
  gap: 6px;

  .pt {
    padding-top: 2px;
  }

  .underline {
    text-decoration: underline;
    margin-left: 4px;
    cursor: pointer;
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 60px;
  justify-content: flex-end;

  .cancel {
    width: 100%;
    border-radius: 10px;
    font-weight: 700;
    color: ${textColors.yourShadow};
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    padding-inline: 24px;
  }

  .save {
    width: 100%;
    color: ${textColors.dark};
    border-radius: 10px;
    font-weight: 700;
    box-shadow: 0 2px 8px -4px rgba(0, 0, 0, 0.14),
      inset 0 -1px 1px rgba(0, 0, 0, 0.04),
      inset 0 2px 2px rgba(255, 223, 63, 0.8);
    padding-inline: 24px;
  }
`;
export const Grid = styled.div`
  width: 100%;
`;
