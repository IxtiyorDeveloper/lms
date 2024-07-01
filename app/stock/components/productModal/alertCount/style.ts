import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const AlerCuntWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column-reverse;
  /* align-items: flex-start; */
  padding: 10px;
  gap: 16px;
  width: 100%;
  background: ${bgColors.brilliance};
  border: 1px solid ${bgColors.purpleCrystal};
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin-top: 16px;

  .flex-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};

    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;

    justify-content: space-between;
    width: 100%;

    .w-80 {
      width: 70% !important;
    }

    .w-20 {
      width: 20% !important;
      display: flex;
      justify-content: space-between;
    }

    .off {
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      letter-spacing: -0.01em;
      color: ${textColors.yourShadow};
    }
  }

  .w-100 {
    width: 100% !important;
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

export const Item = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  align-items: center;

  .mt {
    margin-top: 30px;
  }
`;
