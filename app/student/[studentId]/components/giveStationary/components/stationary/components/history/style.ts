import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  color: ${textColors.white};
  padding: 8px;
  width: 370px;

  .ant-segmented {
    background: ${bgColors.dark};
  }
`;

export const Title = styled.div<{ isActive: boolean }>`
  display: flex;
  gap: 6px;
  align-items: center;
  color: ${(p) => (!p.isActive ? textColors.white : "")};
  transition: 0.6s;

  .ant-badge-count {
    box-shadow: unset !important;
    background: ${(p) => (!p.isActive ? textColors.sceptreBlue : "")};
  }
`;

export const Children = styled.div<{ isActive: boolean }>`
  margin-top: 10px;
  .ant-badge-count {
    box-shadow: unset !important;
  }

  .grouped {
    .item {
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: -0.01em;
      text-align: left;
      display: flex;
      justify-content: space-between;
    }

    .books {
      margin-top: 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;

      .book {
        padding: 10px;
        border-radius: 6px;
        gap: 8px;
        background: ${bgColors.blueGray};
        justify-content: space-between;
        display: flex;
        color: ${textColors.soulfulBlue};
        font-size: ${fontSizes.f12};
        font-weight: 500;
        line-height: 1.16; /* 116.667% */
        letter-spacing: -0.12px;

        .info {
          display: flex;
          gap: 8px;

          .data {
            display: flex;
            flex-direction: column;
            gap: 6px;
            color: ${textColors.white};
            font-size: ${fontSizes.f14};
            font-weight: 500;
            letter-spacing: -0.14px;

            .date {
              color: ${textColors.soulfulBlue};
              font-size: ${fontSizes.f12};
              font-weight: 500;
              line-height: 1.16; /* 116.667% */
              letter-spacing: -0.12px;
            }
          }
        }

        .givenby {
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: right;
          .user {
            display: flex;
            padding: 2px 6px;
            justify-content: center;
            align-items: center;
            gap: 10px;
            color: ${textColors.sadet};
            border-radius: 40px;
            background: ${bgColors.sceptreBlue};
          }
        }
      }
    }
  }
`;
