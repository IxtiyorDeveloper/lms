import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .c-t {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 6px;
    .tag-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .ant-tag {
        margin-inline-end: unset !important;
      }
    }
  }
`;

export const GroupInfoWrapper = styled.div`
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  background-color: ${bgColors.white};
  display: grid;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  flex-wrap: wrap;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  .ant-tag {
    color: ${textColors.brilliance};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.12px;
  }
  .info-title {
    color: ${textColors.soulfulBlue};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.12px;
    text-align: center;
  }

  .info {
    font-weight: 700;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }
  .img {
    border-radius: 50%;
    object-fit: cover;
  }
  .next-link {
    font-weight: 700;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
    text-align: center;
    &:hover {
      text-decoration: underline;
    }
  }
`;
