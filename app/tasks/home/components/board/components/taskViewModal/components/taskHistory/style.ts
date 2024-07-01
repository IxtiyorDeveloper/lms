import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { Image } from "antd";
export const Wrapper = styled.div`
  width: 100%;
  padding: 20px 0 20px 20px;
`;

export const Title = styled.h3`
  font-size: ${fontSizes.f16};
  font-style: normal;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 16px;
`;

export const NoHistoryWrapper = styled.div`
  padding: 40px;
  text-align: center;
`;

export const HistoryDetails = styled.div`
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 1px 8px 2px #14141414;
  margin-bottom: 16px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
`;

export const DateTime = styled.span`
  color: ${textColors.sadet};
  font-weight: 500;
`;

export const Body = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
`;

export const Description = styled.p`
  font-weight: 500;
  .ant-image-mask {
    width: 80px !important;
    height: 80px !important;
    border-radius: 5px !important;
  }
`;

export const ImageWrapper = styled(Image)`
  border-radius: 5px;
  width: 80px !important;
  height: 80px !important;
  object-fit: cover;
  margin-right: 10px;
`;

export const Text = styled.p`
  margin: 10px 0 4px 0;
  font-size: ${fontSizes.f12};
  color: ${textColors.harrison};
  font-weight: 500;
`;
