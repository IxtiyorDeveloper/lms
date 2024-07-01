import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
export const GroupsWrapper = styled.div`
  padding: 22px;
  margin: 20px 40px;
  background-color: ${bgColors.white};
  border-radius: 16px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);

  .head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 30px;
  }

  .teacher {
    display: flex;
    align-items: center;
    gap: 20px;

    .name {
      font-size: ${fontSizes.f16};
      line-height: 1.2;
      letter-spacing: -0.01rem;
      color: ${bgColors.sceptreBlue};
      margin-bottom: 10px;
    }

    span {
      font-size: ${fontSizes.f12};
      font-weight: 500;
      color: ${textColors.yourShadow};
      letter-spacing: -0.01rem;
    }
  }

  .print {
    .btn {
      background-color: ${bgColors.deep};
      color: ${textColors.brilliance};
    }
  }

  .empty {
    height: calc(70vh - 44px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Groups = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
`;
