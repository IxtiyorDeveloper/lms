import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const BottomSite = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 20px;
`;
export const Content = styled.div`
  padding: 20px;
  .inp {
    margin-top: 20px;
  }
`;

export const ActionPlace = styled.div`
  border-radius: 8px;
  border: 1px solid ${bgColors.whiteSmoke};
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  align-items: center;
  margin-top: 30px;
  .date {
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: -0.12px;
    width: 100%;
  }
  .ant-segmented-item {
    svg {
      opacity: 0.3;
    }
  }
  .ant-segmented-item-selected {
    svg {
      opacity: 1;
    }
  }
`;
