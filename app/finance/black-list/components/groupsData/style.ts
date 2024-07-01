import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const TeachersAndGroupsWrapper = styled.div``;

export const GroupsWrapper = styled.div`
  padding: 22px;
  margin: 0 40px 20px 40px;
  background-color: ${bgColors.white};
  border-radius: 16px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);

  .empty {
    height: calc(69vh - 44px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
