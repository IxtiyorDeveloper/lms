import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const RowWrapper = styled.div`
  background: ${bgColors.brilliance};
  box-shadow: inset 0 0 1px ${bgColors.purpleCrystal};
  border-radius: 12px;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    gap: 14px;
    .icon {
    }
    .labels {
      .name {
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: -0.01em;
        color: ${textColors.dark}};
      }
      .phone {
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: -0.01em;
        color:${textColors.yourShadow};
      }
    }
  }
`;
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 20px;
  .cards {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 40px;
  }
  form {
    width: 100%;
    .phone-wrapper{
        margin-top: 40px;
    }
  }
  .text{
    font-weight: 500;
    font-size: ${fontSizes.f14}
    line-height: 1.3;
    text-align: center;
    letter-spacing: -0.01em;
    color: ${bgColors.blueGray};
    margin-top: 40px;
  }
`;
export const SvgWrapper = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-inline: auto;
  position: relative;

  .svg {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .blur {
    position: absolute;
    width: 26px;
    height: 26px;
    left: 50%;
    top: 26px;
    filter: blur(30px);
  }
`;
export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  padding: 20px 0;
  .save {
    width: 100%;
    height: 44px;
    color: ${textColors.dark};
    border-radius: ${borders.b8};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #ffe866;
  }
  .cancel {
    width: 100%;
    height: 44px;
    color: ${textColors.yourShadow};
    border-radius: ${borders.b8};
    background-color: ${bgColors.wildSand};
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
  }
`;
