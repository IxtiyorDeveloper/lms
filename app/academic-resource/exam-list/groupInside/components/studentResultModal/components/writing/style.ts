import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const ProgressPercent = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #000000;
  margin: 12px 0;
`;
export const TabContent = styled.div`
  margin-top: 16px;
  max-height: 530px;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 50px;
    border: 0 solid transparent;
    background-color: #c1c1c1;
  }
  .writing_body {
    padding-bottom: 16px;
    background-color: #fff;
  }
  .topic_description {
    margin-top: 4px;
    padding: 12px 16px;
    border-radius: 12px;
    margin-bottom: 16px;
    background: ${bgColors.whiteSmoke};
  }
  .essay {
    margin: 4px 0 24px;
    padding: 12px 16px;
    border: 1px solid #e5e9eb;
    border-radius: 8px;
    background: ${bgColors.whiteSmoke};
  }
  .essay_score_comment {
    margin: 4px 0 24px;
    padding: 12px 16px;
    background: ${bgColors.cascading};
    border: 1px solid ${bgColors.purpleCrystal};
    border-radius: 6px;
  }
`;
