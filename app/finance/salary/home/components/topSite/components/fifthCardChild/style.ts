import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .img {
    width: 30%;
    margin: 0 auto;
  }

  .input {
    padding: 0 20px;
    margin-bottom: 10px;
  }

  .suffix {
    color: ${textColors.midori};
    font-size: ${fontSizes.f12};
    font-weight: 600;
  }

  .price {
    border-top: 1px solid ${bgColors.purpleCrystal};
    padding: 10px;
    text-align: left;
    font-size: ${fontSizes.f14};
    color: ${textColors.sceptreBlue};
    font-weight: 700;
    MARHG
  }
`;
