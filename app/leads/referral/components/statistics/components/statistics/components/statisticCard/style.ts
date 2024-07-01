import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid ${bgColors.whiteSmoke};
  background-color: ${bgColors.whiteSmoke};
  box-shadow: 0px 0px 45px 0px #00000005 inset;
  h4 {
    font-size: 12px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: -0.01em;
  }
  .title {
    font-weight: 700;
  }
  .progress_bar {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
`;
export const Percent = styled.div`
  text-align: center;
  p {
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: ${textColors.soulfulBlue};
  }
  h5 {
    margin-top: 2px;
    font-family: "Space Grotesk" !important;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: ${textColors.blueGray};
  }
`;
