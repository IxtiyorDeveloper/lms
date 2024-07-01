import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div<{ color: string }>`
  display: flex;
  border-radius: 6px;
  border: 0.5px solid ${bgColors.purpleCrystal};
  background: ${bgColors.brilliance};
  box-shadow: 0 4px 20px -12px rgba(15, 15, 15, 0.24);
  height: 100px;
  overflow: hidden;
  color: ${textColors.sceptreBlue};
  font-size: ${fontSizes.f10};
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.1px;

  .item-level {
    width: 120px;
    max-width: 120px;
    min-width: 120px;
  }

  .item-overall {
    width: 90px;
    max-width: 90px;
    min-width: 90px;
  }

  .item {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-right: 0.5px solid ${bgColors.purpleCrystal};
    height: 100px;

    .child {
      border-bottom: 0.5px solid ${bgColors.purpleCrystal};
      display: flex;
      align-items: center;
      padding: 10px;
      justify-content: center;
      height: 50px;
      text-overflow: ellipsis;
      white-space: nowrap;

      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;

        .img {
          width: 16px;
          height: 16px;
        }
      }
    }
    .child.none-bottom {
      border-bottom: 0;
    }
    .child:last-child {
      border-bottom: 0;
    }
  }
  .item:last-child {
    border-right: 0;
  }
  .item.bg {
    background: ${(props) => props.color};
  }
`;
