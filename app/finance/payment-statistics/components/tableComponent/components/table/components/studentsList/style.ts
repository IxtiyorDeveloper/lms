import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const GroupWrapper = styled.div`
  width: 355px;
  margin: 12px 0;
  background: ${bgColors.white};
  border: 1px solid ${bgColors.whiteSmoke};
  box-shadow: 0 14px 24px -12px rgba(0, 0, 0, 0.08),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 20px 32px -8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .group-header {
    padding: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${bgColors.purpleCrystal};
    gap: 10px;
    .group-info {
      display: flex;
      gap: 10px;
      .studying {
        text-align: center;
        font-weight: 600;
        font-size: ${fontSizes.f12};
        padding: 1px 8px;
        color: ${textColors.white};
        border-radius: 40px;
        display: flex;
        align-items: center;
        height: fit-content;
      }

      .next-link {
        font-size: ${fontSizes.f14};
        font-weight: 700;
        color: ${textColors.blueGray};

        &:hover {
          text-decoration: underline;
        }

        .group-title {
          font-size: ${fontSizes.f12};
          font-weight: 700;
          width: fit-content;
          overflow-x: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 100px;
        }
      }
    }

    .group-name {
      font-size: ${fontSizes.f12};
      font-weight: 700;

      & > span {
        font-size: ${fontSizes.f12};
        font-weight: 600;
        padding: 2px 8px;
        color: ${textColors.white};
        border-radius: 40px;

        &.red {
          background: ${bgColors.pop};
        }

        &.green {
          background: ${bgColors.midori};
        }
      }
    }
  }

  .group-body {
    flex: 1;
  }

  .group-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px;
    background: ${bgColors.whiteSmoke};
    color: ${textColors.sceptreBlue};
    border-top: 1px solid ${bgColors.purpleCrystal};
    border-radius: 0 0 12px 12px;

    .group-foot {
      font-size: ${fontSizes.f16};
      font-weight: 500;
    }

    .group-sum {
      font-size: ${fontSizes.f16};
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: -0.01em;
      color: ${textColors.blueGray};
    }
  }
`;
