import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const ModalTitle = styled.h4`
  padding: 20px 20px 10px 20px;
  font-weight: 700;
  font-size: ${fontSizes.f14};
  letter-spacing: -0.01rem;
  color: ${textColors.blueGray};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 16px 20px 20px 20px;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  background: ${bgColors.brilliance};
  border-top: 1px solid ${bgColors.whiteSmoke};

  //& * {
  //  width: 100% !important;
  //}
`;

export const List = styled.div`
  margin: 20px;
  padding: 24px;
  background-color: ${bgColors.white};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 10px;

  li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed ${bgColors.purpleCrystal};
    padding: 15px 0;
    .title-l {
      font-size: ${fontSizes.f12};
      color: ${textColors.yourShadow};
      font-weight: 500;
    }

    span:last-child {
      font-weight: 500;
    }
  }
  //
  // li.kpi span:last-child {
  //   color: ${textColors.midori};
  // }

  li.penalty span:last-child {
    color: ${textColors.pop};
  }

  .main {
    border-bottom: none;
    font-size: ${fontSizes.f16};
    font-weight: 700;
    color: ${textColors.sceptreBlue};
    margin-bottom: 5px;

    .title {
      font-size: ${fontSizes.f12};
      font-weight: 500;
    }
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 20px 20px 24px;
  gap: 20px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  color: ${textColors.yourShadow};
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;

  .department {
    margin: 20px 20px 0 0;
    display: flex;
    align-items: center;
    gap: 6px;
    height: 20px;
    background-color: ${bgColors.wildSand};
    color: ${textColors.yourShadow};
    padding: 4px;
    border-radius: 6px;
    .d_name {
      max-width: 200px;
      overflow-x: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
    }
  }
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
  height: 80px;
  width: 80px;
  border-radius: 50%;
`;
