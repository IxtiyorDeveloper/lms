import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const IconWrapper = styled.div`
  cursor: pointer;
  padding: 5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${bgColors.sinter};
`;

export const ContentWrapper = styled.div`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${bgColors.whiteSmoke};
  background: ${bgColors.brilliance};
`;

export const FilesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-radius: 10px;
  border: 1px solid ${bgColors.purpleCrystal};
  background: ${bgColors.brilliance};
  padding: 12px 10px;
  h3 {
    color: ${textColors.royal};
    font-size: 12px;
    font-weight: 500;
    letter-spacing: -0.12px;
    text-decoration-line: underline;
  }
`;

export const FileItem = styled.div`
  min-width: 224px;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
  h3 {
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
`;

export const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  a {
    width: 16px;
    height: 16px;
  }
  svg {
    cursor: pointer;
  }
`;
