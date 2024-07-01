import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 8px;
`;
export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export const Title = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.01em;
  color: ${textColors.purpleCrystal};
`;

export const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
`;
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 8px;
  background: ${bgColors.sceptreBlue};
  border-radius: 6px;
`;
export const Left = styled.div`
  display: flex;
  gap: 8px;
`;
export const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Name = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: ${fontSizes.f14};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.white};
  padding-right: 60px;
`;
export const GroupName = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: ${textColors.brotherBlue};
`;
export const Right = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px 6px;
  gap: 10px;
  background: ${bgColors.blueGray};
  border-radius: 40px;
  height: fit-content;
  p {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    color: #b1b5c4;
  }
`;
