import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const TableWrapper = styled.div`
  box-shadow: 0 40px 64px -12px rgba(0, 0, 0, 0.08),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 32px 48px -8px rgba(0, 0, 0, 0.1);
`;

export const ButtonWrapper = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
`;

export const HeaderCell = styled.p`
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${textColors.paleSky};
  width: 100%;
`;

export const CellNameWrapper = styled.div`
  display: flex;
  max-width: 200px;
  color: ${textColors.sceptreBlue} !important;

  .img-wr {
    width: 50px;
    margin-left: 21px;
    .image-inside {
      border-radius: 50%;
    }
  }

  .divider {
    background: ${bgColors.primary};
    border-radius: 0 5px 5px 0;
    width: 3px;
    margin-left: -13px;
    margin-right: 13px;
  }

  .index {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .name {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: -0.01em;
    margin-left: 14px;
    align-self: center;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const CellDescriptionWrapper = styled.div`
  font-weight: 600;
  color: ${textColors.yourShadow};
  max-width: 300px;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const PriceWrapper = styled.p`
  font-weight: 600;
  font-family: "Space Grotesk", sans-serif;
`;

export const TextWrapper = styled.p`
  font-weight: 600;
  font-size: ${fontSizes.f12};
`;
