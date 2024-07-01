import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 20px 10px 0;
  gap: 20px;
  color: ${textColors.yourShadow};
`;

export const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: ${fontSizes.f12};

  & p:first-of-type {
    font-size: ${fontSizes.f14};
    margin: 0;
  }
`;

export const PhotoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${bgColors.whiteSmoke};
  height: 110px;
  width: 110px;
  border-radius: 50%;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  .title {
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }

  .check {
    width: 100%;
    padding: 15px;
    background-color: ${bgColors.wildSand};
    border-radius: 6px;

    & .checkBox {
      align-items: flex-start;

      input {
        outline: none !important;
      }
    }

    & span {
      font-size: ${fontSizes.f12};
    }
  }
`;
export const Content = styled.div`
  margin-top: 20px;

  .flex {
    margin-top: 20px;
    display: flex;
    gap: 14px;
  }
`;

export const Badge = styled.span`
  border-radius: 40px;
  padding: 0 4px;
  font-size: ${fontSizes.f12};
  font-weight: 600;
  color: ${textColors.white};
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

export const CheckWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  padding: 10px 0;
  border-bottom: 1px solid ${bgColors.wildSand};
  gap: 8px;
`;

export const FlexWrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid ${bgColors.wildSand};
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
`;
