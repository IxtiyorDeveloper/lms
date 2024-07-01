import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 5px;
  background: ${bgColors.white};
  border: 1px solid ${bgColors.purpleCrystal};
  box-shadow: inset 0px 0px 45px rgba(0, 0, 0, 0.02);
  border-radius: 6px;
`;
export const Header = styled.p`
  background: ${bgColors.sceptreBlue};
  border-radius: 2px;
  font-style: normal;
  font-weight: 400;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.brilliance};
  padding: 5px 10px;
`;
export const Content = styled.div`
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;
export const Name = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .observed {
    width: 8px;
    height: 8px;
    background: #44b26b;
    border-radius: 50%;
  }
`;
export const Dot = styled.div``;
export const Text = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.blueGray};
`;
export const Count = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.blueGray};
`;
export const Percentage = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  letter-spacing: -0.01em;
  color: ${textColors.yourShadow};
`;
