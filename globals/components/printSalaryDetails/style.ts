import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

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
`;

export const List = styled.div`
  margin: 18px;
  padding: 10px;
  background-color: ${bgColors.white};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 10px;

  .cli {
    flex-direction: column;
  }

  .full-name,
  .main .grotesk {
    width: 100%;
    justify-content: center;
    text-align: center;
    font-size: ${fontSizes.f20};
    font-weight: 900;
    border: 1px solid ${bgColors.yourShadow};
    border-radius: 10px;

    .name {
      font-weight: 900;
    }

    .role {
      font-size: ${fontSizes.f12};
    }
  }

  li.main {
    border: none;
  }

  ul.second {
    display: flex;
    gap: 6px;

    li {
      width: 100%;
      display: block;

      .grotesk {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .title-l {
        margin-bottom: 5px;
      }
    }
  }

  li.last {
    border-bottom: 1px solid ${bgColors.yourShadow};
  }

  li {
    border: 1px solid ${bgColors.yourShadow};
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    //border-bottom: 1px dashed ${bgColors.purpleCrystal}50;
    padding: 10px;

    .title-l {
      font-size: ${fontSizes.f12};
      color: ${textColors.yourShadow};
      font-weight: 500;
      display: flex;
      align-items: flex-end;
      gap: 7px;
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

  .title-name,
  .title-name + span {
    font-size: ${fontSizes.f18};
    font-weight: 700;
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
