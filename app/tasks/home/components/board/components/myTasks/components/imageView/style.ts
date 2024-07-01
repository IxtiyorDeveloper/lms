import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";
import { Image } from "antd";

export const Wrapper = styled.div`
  display: flex;
  gap: 4px;
`;

export const ImageWrapper = styled(Image)`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
`;
export const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 6px;
  background: ${bgColors.whiteSmoke};
`;

export const ImageSide = styled.div`
  position: relative;
`;

export const Number = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  border-radius: 6px;
  font-size: 30px;
  background: rgba(0, 0, 0, 0.4);
  color: ${textColors.white};
`;
