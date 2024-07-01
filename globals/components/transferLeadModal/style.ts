import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

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
  .mb10 {
    margin-bottom: 10px;
  }

  .content {
    width: 100%;
    margin-left: 10px;
  }
`;

export const ContentFirst = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};

  .button {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    &.eRow {
      padding-bottom: 24px;
    }
  }

  .takeLead {
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};
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

export const SelectTab = styled.div<{ active: boolean; color: string }>`
  background: ${(props) => (props.active ? props.color : bgColors.brilliance)};
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  height: 61px;
  text-align: center;
  display: grid;
  cursor: pointer;
  .title {
    font-size: ${fontSizes.f14};
    font-weight: 500;
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    flex: 1;
    margin-top: 10px;
  }

  .color {
    background: ${(props) => props.color};
    filter: blur(0.1px);
    height: 6px;
    min-width: 100px;
    align-self: flex-end;
    display: flex;
    margin: 0 10px 4px 10px;
    border-radius: 2px;
  }
`;
