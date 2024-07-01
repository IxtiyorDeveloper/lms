import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import {
  groupStatus,
  STATE_OPENED,
  STATE_OPENING,
  STATE_RUNNING,
} from "constants/groupStatus";

export const CardWrapper = styled.div`
  position: relative;
  border-radius: 10px;
  width: 100%;
  min-width: 150px;
`;

export const PaddingWrapper = styled.div`
  padding: 14px 12px;
`;

export const GroupName = styled.h3`
  margin-bottom: 2px;
  width: 100%;
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const DateWrapper = styled.p`
  font-weight: 500;
  font-size: ${fontSizes.f10};
`;

export const Badge = styled.div`
  background-color: ${bgColors.pepper};
  color: ${textColors.white};
  border-radius: 40px;
  height: 20px;
  width: 25px;
  font-size: ${fontSizes.f12};
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BadgeForCard = styled.div`
  background-color: ${bgColors.pop};
  color: ${textColors.white};
  border-radius: 40px;
  padding: 0 4px;
  height: 16px;
  font-size: ${fontSizes.f10};
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Status = styled.span<{ state: keyof typeof groupStatus }>`
  letter-spacing: -0.01em;
  background: ${(props) =>
    props.state === STATE_OPENING
      ? bgColors.primary
      : props.state === STATE_OPENED
        ? bgColors.deep
        : props.state === STATE_RUNNING
          ? bgColors.serengeti
          : bgColors.deep};
  color: ${textColors.white};
  font-size: ${fontSizes.f10};
  line-height: 13.66px;
  text-transform: uppercase;
  font-weight: 800;
  border-radius: 4px;
  padding: 2px 4px;
`;

export const FlexSt = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TeacherWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 7.5px;
  font-size: ${fontSizes.f12};
  font-weight: 700;
`;

export const GridWrapper = styled.div<{ lastTwo?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  ${(props) =>
    props.lastTwo &&
    `
     & div:nth-of-type(1) {
       grid-column: 1 / 3;
     }
   
     & div:nth-of-type(2) {
       grid-column: 3 / 5;
     }
   
     & div:nth-of-type(3) {
       grid-column: 5 / 7;
     }
   
     & div:nth-of-type(4) {
       grid-column: 1 / 4;
     }
   
     & div:nth-of-type(5) {
       grid-column: 4 / 7;
     }
   
     & div:nth-of-type(6) {
       grid-column: 1 / 4;
     }
   
     & div:nth-of-type(7) {
       grid-column: 4 / 7;
     }
   
     & div:last-child {
       grid-column: 1 / 7 !important;
     }
    `}
`;

export const NewImg = styled.span`
  position: absolute;
  top: -15px;
  right: -15px;
`;

export const NameWrapper = styled.p`
  margin: 0 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 70px;
`;

export const TeacherNameWrapper = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  padding-left: 10px;
`;
