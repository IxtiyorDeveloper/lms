import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div`
  padding: 20px;
`;

export const ItemWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const ButtonAdd = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
`;

export const Flex = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;

  .button {
    width: fit-content;
  }

  .gender {
    display: flex;
    align-items: flex-end;
    gap: 8px;

    & > div {
      width: 100%;
    }
  }
`;

export const FamilyFormWrapper = styled.div`
  position: relative;
  padding: 20px;
  border-radius: 12px;
  background-color: ${bgColors.brilliance};
  box-shadow: 0 0 10px 0 #0000000a inset;
  margin-bottom: 20px;
`;

export const FamilyItemTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const TextSecondary = styled.p`
  font-size: ${fontSizes.f12};
  font-weight: 700;
`;
