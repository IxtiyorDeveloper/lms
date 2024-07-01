import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  background: #fcfcfd;
  border-radius: 8px;
  margin-bottom: 20px;
`;
export const Right = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;
export const Count = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.2;
  text-align: center;
  color: ${textColors.sceptreBlue};
`;
export const Label = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.2;
  text-align: center;
  color: ${textColors.brotherBlue};
`;
export const LastLabel = styled.p`
  font-size: ${fontSizes.f12};
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.01em;
  text-align: left;
`;
export const MainTitle = styled.p`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const Text = styled.p`
  font-size: ${fontSizes.f16};
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
`;
export const Circle = styled.div<{ active: boolean }>`
  transition: all 0.3s;
  line-height: 1;
  border: 1px solid ${bgColors.purpleCrystal};
  transform: ${(props) => (props.active ? "rotate(0deg)" : "rotate(-90deg)")};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RightElemenets = styled.div`
  position: absolute;
  right: 20px;
`;

export const CustomTooltipWrapper = styled.div`
  background-color: ${bgColors.black};
  border-radius: 5px;
  color: ${bgColors.white};
  padding: 5px;

  .part:first-of-type .title .dot {
    background-color: ${bgColors.midori};
  }

  .part:nth-of-type(2) .title .dot {
    background-color: ${bgColors.fond};
  }

  .part:last-of-type .title .dot {
    background-color: ${bgColors.pepper};
  }

  .title {
    display: flex;
    gap: 4px;
    font-size: ${fontSizes.f12};
    color: ${textColors.brotherBlue};
    align-items: center;

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
  }

  .part {
    padding: 5px;
    border-bottom: 1px solid ${bgColors.blueGray};
  }

  .part:last-of-type {
    border-bottom: none;
  }

  .ml-amount {
    padding-left: 10px;
    font-weight: 600;
    color: ${textColors.white};
    font-family: "Space Grotesk", sans-serif !important;
  }
`;
