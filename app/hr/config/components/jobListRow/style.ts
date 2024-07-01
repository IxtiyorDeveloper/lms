import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  padding: 10px 20px;
  background-color: ${bgColors.whiteSmoke};
  border-radius: 6px;
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .col_item {
    display: flex;
    color: ${textColors.sceptreBlue};
    font-size: ${fontSizes.f12};
    font-weight: 600;
    .index {
      min-width: 28px;
    }
  }
  .col_item_right {
    display: flex;
    align-items: center;
    gap: 20px;
    .edit_icon {
      width: 30px;
      height: 30px;
      padding: 6px;
      border-radius: 50%;
      cursor: pointer;
      border: 1px solid ${bgColors.purpleCrystal};
      background-color: ${bgColors.brilliance};
    }
  }
  .switch-wrapper {
   
  }
`;
