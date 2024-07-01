import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Box = styled.div<{ width?: number; p?: string }>`
  width: ${(props) => props.width}%;
  background: ${bgColors.white};
  margin-top: 20px;
  //box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.06);
  //border-radius: 6px;
  // padding: ${({ p }) => (p ? p : "6px")};
`;
export const SmsTitle = styled.h3`
  font-size: ${fontSizes.f16};
  font-weight: 600;
  color: ${textColors.sceptreBlue};
`;
export const WrapperText = styled.div`
  display: inline-block;
  justify-content: flex-start;
  gap: 5px;
  padding: 10px;

  & span {
    padding: 2px 5px;
    background: #fff9cb;
    box-shadow: inset 0 0 4px rgba(182, 141, 0, 0.16);
    border-radius: 2px;
    cursor: pointer;
    transition: 0.4s;
    margin-right: 5px;

    &:hover {
      background: #fff4a9;
    }

    &:active {
      background: #faed95;
    }
  }
`;
export const BoxInput = styled.div`
  background: #ffffff;
  border: 1px solid ${bgColors.purpleCrystal};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: grid;

  & mark {
    padding: 2px 5px;
    background: #fff9cb;
    box-shadow: inset 0 0 4px rgba(182, 141, 0, 0.16);
    border-radius: 2px;
    cursor: pointer;
    transition: 0.4s;
  }

  .limit {
    display: flex;
    flex: 1;
    align-self: flex-end;
    justify-content: flex-end;
    margin-top: auto;
    font-weight: 400;
    font-size: ${fontSizes.f12};
    line-height: ${fontSizes.f20};
    letter-spacing: -0.01em;
    color: ${textColors.brotherBlue};
    padding: 10px;
  }

  .out {
    color: ${textColors.red};
  }
`;
export const SMS = styled.div`
  position: absolute;
  bottom: 5%;
  left: 19%;
  z-index: 99;
  background: #e4e3e6;
  padding: 7px;
  border-radius: 8px;
  width: 65%;
  box-shadow: 1px 0 10px ${bgColors.purpleCrystal};
  font-size: ${fontSizes.f9};

  &::before {
    content: "";
    position: absolute;
    display: inline-block;
    height: 18px;
    width: 8px;
    background: #e4e3e6;
    bottom: -3px;
    left: -2%;
    border-bottom-right-radius: 10px;
  }

  &::after {
    content: "";
    position: absolute;
    display: inline-block;
    height: 18px;
    width: 7px;
    background: white;
    bottom: 0;
    left: -3.5%;
    border-bottom-right-radius: 10px;

    @media (min-width: 1250px) and (max-width: 1540px) {
      left: -6%;
    }
  }
`;
