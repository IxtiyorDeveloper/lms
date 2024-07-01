import styled from "@emotion/styled";
import { Flex } from "antd";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 20px 10px 0;
  gap: 20px;
  color: ${textColors.yourShadow};
  h4 {
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f14};
    font-weight: 600;
    line-height: 24px;
    letter-spacing: -0.14px;
  }
`;

export const VacancyName = styled.div`
  padding: 4px 8px;
  color: ${textColors.white};
  font-size: ${fontSizes.f12};
  font-style: normal;
  font-weight: 500;
  width: fit-content;
  border-radius: 20px;
  background: ${bgColors.deep};
  box-shadow: 0 0 2px 0 #87a5ff inset;
  cursor: pointer;
`;

export const Wrapper = styled.div`
  .title {
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }
`;
export const Content = styled.div`
  margin-top: 20px;
`;

export const SwiperWrapper = styled.div`
  margin-top: 20px;
  .check {
    /* width: 25%; */
    min-height: 55px;
    height: 100%;
    padding: 15px 8px 10px;
    background-color: ${bgColors.wildSand};
    border-radius: 6px;
    position: relative;
    h4 {
      color: ${textColors.black};
      font-size: ${fontSizes.f12};
      font-weight: 400;
      margin: 12px 0 4px;
      line-height: normal;
    }
    p {
      font-weight: 400;
      line-height: normal;
      color: ${textColors.soulfulBlue};
      font-size: ${fontSizes.f10};
      white-space: nowrap;
    }
    .icon {
      height: 24px;
    }
    .ant-checkbox {
      position: absolute;
      top: 10px;
      left: 10px;
    }
    .ant-checkbox + span {
      padding-inline-start: 0;
      padding-inline-end: 0;
    }
    .ant-checkbox-wrapper {
      display: flex;
      justify-content: center;
      &::after {
        display: none;
      }
    }
  }
`;
export const CheckWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 60px;
  justify-content: flex-end;

  .cancel {
    border-radius: ${borders.b10};
    height: 44px;
    font-weight: 700;
    min-width: 88px;
    color: ${textColors.yourShadow};
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    background-color: ${bgColors.wildSand};
  }

  .save {
    color: ${textColors.dark};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #ffe866;
    border-radius: ${borders.b10};
    font-weight: 700;
    height: 44px;
    min-width: 88px;
  }
`;

export const ChildWrapper = styled.div<{ m?: string; p?: string }>`
  margin-top: ${({ m }) => (m ? m : "20px")};
  padding: ${({ p }) => (p ? p : "20px")};
  background-color: ${bgColors.white};

  .input-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }

  .sms_container {
    height: 20px;
    background: ${bgColors.primary};
    border-radius: 4px;
    font-weight: 600;
    font-size: ${fontSizes.f8};
    line-height: 2.5;
    letter-spacing: -0.01em;
    color: #353945;
    flex: none;
    order: 1;
    flex-grow: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    padding: 0 8px;
  }

  .empty-wrapper {
    grid-column: 1/3;
  }
  textarea {
    min-height: 120px;
    /* padding: 4px 0; */
  }
`;

export const ProfileWrapper = styled.div`
  padding: 7px 11px;
  background: ${bgColors.brilliance};
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 5px;

  & img {
    border-radius: 50%;
  }

  .name {
    font-size: ${fontSizes.f12};
    font-weight: 500;
    line-height: -0.1rem;
    padding-left: 2px;
  }

  .phone {
    font-size: ${fontSizes.f10};
    color: ${textColors.yourShadow};
  }
`;

export const QuilWrapper = styled.div`
  position: relative;
  .ql-editor {
    padding-bottom: 26px;
  }
  .count {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: ${textColors.sadet};
    font-size: ${fontSizes.f12};
    font-weight: 400;
    line-height: 20px;
    letter-spacing: -0.12px;
  }
`;
