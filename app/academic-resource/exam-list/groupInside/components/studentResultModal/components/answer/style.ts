import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Container = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 8px;
  background-color: #f3f3f3;

  .answer {
    width: calc(100% - 48px);
    color: ${textColors.black};
    span {
      font-family: "Noto Sans", sans-serif !important;
    }
    .incorrect {
      color: ${bgColors.red};
    }
    .correct {
      color: ${bgColors.midori};
    }
  }
  .question_order {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    text-align: left;
    color: #72777a;
  }
  .not_answered {
    color: ${textColors.orangeJuice};
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
`;
