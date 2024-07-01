import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const ModalContent = styled.div`
  padding: 10px;
`;

export const Flex = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;

  .avatar {
    object-fit: cover;
    min-width: 150px;
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SubTitle = styled.h3`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 6px;
`;

export const TableWrapper = styled.table`
  border-collapse: collapse;
  border: 1px solid ${bgColors.whiteSmoke};
  width: 100%;

  & tr,
  td {
    font-size: ${fontSizes.f12};
    letter-spacing: -0.03rem;
    font-weight: 500;
    border: 1px solid ${bgColors.whiteSmoke};
  }

  td {
    padding: 1px 10px;
    width: 50%;
  }
`;
