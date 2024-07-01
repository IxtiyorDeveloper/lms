import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  border-radius: 12px;
  border: 0.5px solid ${bgColors.whiteSmoke};
  background: ${bgColors.brilliance};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  width: 100%;
  padding: 14px 15px;
  align-items: center;
  height: fit-content;

  .profile {
    display: flex;
    gap: 10px;
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.12px;
    align-items: center;
    width: 33%;

    .name {
      gap: 10px;
      color: ${textColors.blueGray};
      font-size: ${fontSizes.f12};
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.12px;
      flex: 1;
      text-overflow: ellipsis;
      overflow-x: hidden;
      white-space: nowrap;
    }
  }

  .gr-wr {
    width: 20%;

    .groups {
      border-radius: 40px;
      background: var(--f-4-f-5-f-6, #f4f5f6);
      display: inline-flex;
      padding: 6px 10px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      color: ${textColors.blueGray};
      font-size: ${fontSizes.f12};
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.12px;
      cursor: pointer;
    }
  }

  .description {
    width: 20%;
    .sms {
      width: fit-content;
      cursor: pointer;
    }
  }

  .amount {
    color: ${textColors.pop};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.12px;
  }
`;
export const StyledContent = styled.div<{ p?: string }>`
  border-radius: 16px;
  background: ${bgColors.white};
  box-shadow: 0 32px 48px -8px rgba(0, 0, 0, 0.1),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 40px 64px -12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  .title {
    color: ${textColors.sceptreBlue};
    font-size: ${fontSizes.f14};
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.14px;
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
    max-height: 400px;
    height: auto;
    overflow-y: auto;
  }
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 20px;
`;
