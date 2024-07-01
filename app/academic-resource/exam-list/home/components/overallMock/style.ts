import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  background-color: ${bgColors.white};
  border-radius: 12px;
  padding: 18px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  margin-bottom: 20px;

  a {
    text-decoration: none !important;
  }
`;
export const Sector = styled.div`
  position: relative;
  text-align: center;
  transition: 0.3s;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 66px;
  &:hover {
    transition: 0.3s;
    background-color: ${bgColors.whiteSmoke};
  }
`;
export const Title = styled.p`
  font-size: ${fontSizes.f16};
  font-weight: 400;
  color: ${textColors.yourLighter};
  line-height: 1.7;
`;
export const Count = styled.p`
  font-size: ${fontSizes.f24};
  font-weight: 600;
  line-height: 1.3;
  color: ${textColors.blueGray};

  &:nth-child(2) {
    font-size: ${fontSizes.f14};
    font-weight: 500;
  }
`;
export const Hr = styled.div`
  position: absolute;
  top: 10%;
  left: 1px;
  width: 1px;
  height: 80%;
  background-color: ${bgColors.purpleCrystal};
`;
export const Bottom = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-top: 8px;
`;
export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 4px;
  background: ${bgColors.purpleCrystal};
  border-radius: 4px;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  height: fit-content;
`;
