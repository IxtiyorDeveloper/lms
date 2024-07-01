import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  border-radius: 16px;
  overflow: hidden;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  .title {
    font-size: 12px;
    font-weight: 700;
    line-height: 15px;
    letter-spacing: -0.01em;
  }

  .services {
    display: flex;
    flex-direction: column;
    gap: 16px;
    .service {
      display: flex;
      justify-content: space-between;
      background: ${bgColors.brilliance};
      height: 60px;
      align-items: center;
      padding: 20px;
      border-radius: 10px;
      border: 1px solid ${bgColors.purpleCrystal};
      font-size: 12px;
      font-weight: 600;
      line-height: 20px;
      letter-spacing: -0.01em;
      text-align: left;
    }
  }

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
  justify-content: flex-end;
  background: ${bgColors.brilliance};
  padding: 16px 20px 20px 20px;
  border-top: 1px solid ${bgColors.whiteSmoke};

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
    box-shadow:
      0 2px 8px -4px rgba(0, 0, 0, 0.14),
      inset 0 -1px 1px rgba(0, 0, 0, 0.04),
      inset 0 2px 2px rgba(255, 223, 63, 0.8);
    padding-inline: 24px;
  }
`;
export const Grid = styled.div`
  width: 100%;
`;
