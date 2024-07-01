import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const RowFlex = styled.div`
  display: flex;
  align-items: center;
  margin-top: 7px;
  gap: 5px;
  .lessons {
    background: ${bgColors.yourLighter};
    font-weight: 500;
    font-size: ${fontSizes.f11};
    letter-spacing: -0.01em;
    color: ${textColors.white};
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
  }
`;

export const Wrapper = styled.div`
  background: ${bgColors.white};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8px;
  border-bottom: 1px solid ${bgColors.purpleCrystal};
  .profile {
    display: flex;
    gap: 10px;
    align-items: center;
    .id {
      color: ${textColors.blueGray};
      font-size: ${fontSizes.f12};
    }
    .name {
      width: 100%;
      a {
        width: 100%;
        max-width: 150px;
        display: block;
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: 500;
        font-size: ${fontSizes.f12};
        line-height: 1.2;
        letter-spacing: -0.01em;
        color: ${textColors.blueGray};
        &:hover {
          text-decoration: underline;
        }
      }
    }
    //.img {
    //  height: 45px;
    //  width: 45px;
    //  border-radius: 50%;
    //}
  }

  .studying {
    font-weight: 600;
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    color: ${textColors.secondary};
    padding: 3px 8px;
    background-color: ${bgColors.transparentGreen};
    width: fit-content;
    border-radius: 10px;
  }
`;
