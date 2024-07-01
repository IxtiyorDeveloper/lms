import styled from "@emotion/styled";
import { bgColors, borders, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 340px;
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

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 50px;

  .cancel {
    width: 100%;
    height: 44px;
    color: ${textColors.yourShadow};
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    border-radius: 8px;
    font-weight: 700;
  }

  .save {
    width: 100%;
    box-shadow: inset 0 4px 6px ${bgColors.friedEgg};
    border-radius: 8px;
    font-weight: 700;
  }
`;
export const Grid = styled.div`
  width: 100%;
`;
