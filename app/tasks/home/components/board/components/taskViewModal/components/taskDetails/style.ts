import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  padding: 20px 20px 20px 0;
`;

export const Title = styled.h3`
  font-size: ${fontSizes.f16};
  font-style: normal;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 12px;
`;

export const AttachmentsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin-bottom: 16px;
`;

export const NoAttachment = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${bgColors.whiteSmoke};
  border-radius: 6px;
  grid-column: 1/4;
  height: 110px;
  color: ${textColors.yourShadow};
  text-align: center;
`;

export const Attachment = styled.img`
  border-radius: 6px;
  height: 110px;
  width: 100%;
  object-fit: cover;
`;

export const OpenedTaskDetails = styled.div`
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 1px 8px 2px #14141414;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  padding-bottom: 16px;
`;

export const Body = styled.div`
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  padding: 16px 0;
`;

export const DateWrapper = styled.span`
  color: ${textColors.harrison};
  font-size: ${fontSizes.f14};
  font-weight: 500;
`;

export const VideoWrapper = styled.div`
  width: 148px;
  height: 110px;
  border-radius: 6px;
  background: ${bgColors.whiteSmoke};
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  p {
    width: 100%;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 8px;
  }
`;
