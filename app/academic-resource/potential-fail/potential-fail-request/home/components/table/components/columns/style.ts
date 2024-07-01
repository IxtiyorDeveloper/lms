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
export const BText = styled.p`
  margin-top: 4px;
  color: ${textColors.pop};
  font-size: ${fontSizes.f12};
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
export const CreatedBy = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
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
