import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 0 40px;
`;
export const Content = styled.div`
  border-radius: 16px;
  background: ${bgColors.white};
  overflow: hidden;

  .m-r {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 20px;
    min-height: 100vh;

    .title {
      color: ${textColors.dark};
      font-size: ${fontSizes.f16};
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.16px;
      margin: 0 0 16px 0;
    }

    .share {
      display: flex;
      flex-direction: column;
      gap: 24px;

      .r-t {
        color: ${textColors.yourShadow};
        font-size: ${fontSizes.f12};
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -0.12px;
      }

      .flex {
        display: flex;
        justify-content: space-between;

        .left {
          width: 30%;

          .box {
            border-radius: 12px;
            border: 0.5px solid ${bgColors.whiteSmoke};
            background: ${bgColors.brilliance};
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
            padding: 16px 20px;

            .label {
              color: ${textColors.dark};
              font-size: ${fontSizes.f12};
              font-style: normal;
              font-weight: 600;
              line-height: normal;
              letter-spacing: -0.12px;
              margin-bottom: 10px;
            }

            .ant-input-number .ant-input-number-input {
              color: ${textColors.red} !important;
            }

            .ant-input-number-affix-wrapper {
              background: ${bgColors.yukon} !important;
              padding-left: 8px !important;

              .ant-input-number-input {
                padding: 7.25px 12px 7.25px 0 !important;
              }

              .minus {
                color: ${textColors.red} !important;
              }
            }
          }
        }

        .right {
          width: 30%;

          .box {
            border-radius: 12px;
            border: 0.5px solid ${bgColors.whiteSmoke};
            background: ${bgColors.brilliance};
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
            padding: 16px 20px;

            .label {
              color: ${textColors.dark};
              font-size: ${fontSizes.f12};
              font-style: normal;
              font-weight: 600;
              line-height: normal;
              letter-spacing: -0.12px;
              margin-bottom: 10px;
            }

            .ant-input-number .ant-input-number-input {
              color: ${textColors.midori} !important;
            }

            .ant-input-number-affix-wrapper {
              background: ${bgColors.yukon} !important;
              padding-left: 8px !important;

              .ant-input-number-input {
                padding: 7.25px 12px 7.25px 0 !important;
              }

              .plus {
                color: ${textColors.midori} !important;
              }
            }
          }
        }

        .middle {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          flex: 1;

          .t-c {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            gap: 4px;

            .one-lesson {
              color: var(--353945, #353945);
              font-size: ${fontSizes.f12};
              font-style: normal;
              font-weight: 600;
              line-height: normal;
              letter-spacing: -0.12px;
            }

            margin-bottom: 10px;
          }

          .arrow {
            position: relative;
            height: fit-content;
            width: 80%;
            margin: 0 auto;
            max-width: 200px;

            .s-l {
              position: absolute;
              left: -2px;
              top: calc(50% + 2px);
              transform: translate(0, -50%);
            }

            .s-r {
              position: absolute;
              right: -2px;
              top: calc(50% - 2px);
              transform: translate(0, -50%) rotate(180deg);
            }

            .line {
              background-color: ${bgColors.sadet};
              height: 2px;
              min-width: 100px;
            }
          }
        }
      }
    }
  }

  .bottom {
    width: 100%;
    background: ${bgColors.brilliance};
    padding: 16px 20px 20px 0;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    border-top: 1px solid ${bgColors.whiteSmoke};
  }
`;
