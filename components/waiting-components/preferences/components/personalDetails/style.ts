import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  gap: 14px;
  align-items: stretch;
`;

export const InfoBox = styled.div`
  padding: 12px 16px 12px 12px;
  background: ${bgColors.whiteSmoke};
  box-shadow: inset 0px 0px 45px rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  display: flex;
  width: 50%;
  justify-content: space-between;
  align-items: center;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;
export const Right = styled.div`
  display: flex;
  gap: 10px;
  a {
    text-decoration: none !important;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Name = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.01em;
  color: ${textColors.blueGray};
`;

export const NoteBox = styled.div`
  padding: 12px 16px 12px 12px;
  background: ${bgColors.whiteSmoke};
  box-shadow: inset 0px 0px 45px rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  width: 50%;
`;
export const NTitle = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: ${textColors.blueGray};
`;
export const NContent = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
  margin-top: 10px;
`;
