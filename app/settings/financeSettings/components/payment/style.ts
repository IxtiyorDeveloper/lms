import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const FormWrapper = styled.div`
  min-height: 70vh;
  padding: 20px;
  border-top: 1px solid ${bgColors.whiteSmoke};

  .switches {
    display: flex;
    gap: 15px;
    margin-top: 40px;
    flex-wrap: wrap;

    .child {
      display: flex;
      padding: 14px 14px 0 14px;
      gap: 8px;

      .ant-input {
        background: white;
      }
    }

    .child.switch {
      .ant-picker {
        border-radius: 6px;
        border: 1px solid ${bgColors.purpleCrystal};
        background: ${bgColors.white};
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
      }
      .switch-wrapper {
        display: flex;
      }

      .switch-input {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;

        .title {
            color: ${textColors.onyx};
            font-size: ${fontSizes.f12};
          font-weight: 500;
          letter-spacing: -0.12px;
        }

        .child {
          padding: 0 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          border-radius: 6px;
          border: 1px solid ${bgColors.purpleCrystal};
          background: ${bgColors.white};
          height: 37px;
          box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);

          .text {
            color: ${textColors.soulfulBlue};
            font-size: ${fontSizes.f12};
            font-weight: 400;
            letter-spacing: -0.12px;
            white-space: nowrap;
          }
        }
      }
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 14px;
  gap: 10px;
`;

export const Switcher = styled.div`
  & * {
    font-size: ${fontSizes.f10} !important;
  }
`;
