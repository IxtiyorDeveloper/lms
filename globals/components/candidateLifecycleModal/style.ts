import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const CandidateInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0 56px;
  border-radius: 14px;
  padding: 16px 20px;
  background: ${bgColors.whiteSmoke};
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.15) inset;
`;
export const CandidateName = styled.div`
  h4 {
  }
  .dob {
    margin: 3px 0;
    p,
    span {
      font-size: 12px;
      font-weight: 500;
      line-height: 18px;
      letter-spacing: -0.12px;
    }
    p {
      color: ${textColors.soulfulBlue};
    }
  }
`;
export const Label = styled.p`
  color: ${textColors.blueGray};
  font-size: ${fontSizes.f12};
  font-weight: 500;
`;
export const CandidateVacancy = styled.div`
  display: inline-flex;
  align-items: center;
  height: fit-content;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 12px;
  color: ${textColors.blueGray};
  background-color: ${bgColors.fluorescent};
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25) inset;
`;

export const TimeLineWrapper = styled.div`
  padding: 30px 24px;
  border-radius: 20px;
  background: ${bgColors.whiteSmoke};
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.15) inset;
  .ant-timeline .ant-timeline-item-head {
    background-color: transparent;
    margin-top: 12px;
  }
`;
export const ActionWrapper = styled.div`
  padding: 12px;
  border-radius: 12px;
  background: ${bgColors.white};
  border: 1px solid ${bgColors.whiteSmoke};
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.08);
  margin-left: 18px;
  .double_arrow {
    position: relative;
    top: 20px;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px 4px 5px;
  border-radius: 40px;
  background: ${bgColors.whiteSmoke};
  box-shadow: 0 0 1px 0 rgba(177, 181, 195, 0.5) inset;
  p {
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f12};
    font-weight: 500;
  }
`;

export const ActionDate = styled.div`
  display: flex;
  align-items: center;
  color: ${textColors.soulfulBlue};
  font-size: ${fontSizes.f12};
  font-weight: 500;
  line-height: normal;
`;
export const CommentWrapper = styled.div`
  width: 100%;
  margin-top: 14px;
  h4 {
    font-weight: 500;
    color: ${textColors.soulfulBlue};
    font-size: ${fontSizes.f12};
  }
  .comment {
    color: ${textColors.sceptreBlue};
    font-size: ${fontSizes.f12};
    font-weight: 500;
    margin-top: 8px;
    padding: 12px 14px;
    border-radius: 6px;
    background: ${bgColors.whiteSmoke};
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.08) inset;
  }
`;
