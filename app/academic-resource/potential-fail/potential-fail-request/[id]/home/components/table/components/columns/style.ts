import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Circular = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 13px 0 13px 30px;
`;
export const PContent = styled.div``;
export const TText = styled.p`
  color: ${textColors.midori};
  font-size: ${fontSizes.f12};
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
export const BWrapper = styled.div`
  overflow: hidden;
  max-width: 210px;
  display: flex;
  gap: 8px;
  align-items: center;

  .branch {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const CreatedBy = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  .ant-tag {
    display: flex;
    padding: 4px 6px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 8px;
    color: ${textColors.white};
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 166.667% */
    letter-spacing: -0.12px;
  }
`;
export const Details = styled.div``;
export const Name = styled.p`
  color: ${textColors.blueGray};
  font-size: ${fontSizes.f12};
  font-style: normal;
  font-weight: 600;
  line-height: 14px; /* 116.667% */
  letter-spacing: -0.12px;
`;
export const Position = styled.p`
  color: ${textColors.soulfulBlue};
  font-size: ${fontSizes.f12};
  font-style: normal;
  font-weight: 500;
  line-height: 14px; /* 116.667% */
  letter-spacing: -0.12px;
  margin-top: 2px;
`;
