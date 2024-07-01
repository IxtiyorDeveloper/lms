import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.form`
  margin: 20px 40px;
  border-radius: 10px;
  background-color: ${bgColors.white};
`;

export const Text = styled.p`
  font-size: ${fontSizes.f14};
  font-weight: 700;
  margin-bottom: 20px;
`;

export const TextLabel = styled.p`
  font-size: ${fontSizes.f12};
  font-weight: 500;
  line-height: 15px;
  color: ${textColors.sceptreBlue};
  letter-spacing: -0.01em;
  margin-bottom: 10px;
`;

export const PlusWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0.7;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 1;
  }
`;

export const Title = styled.h1`
  font-size: ${fontSizes.f14};
  font-weight: 700;
`;

export const Flex = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  .button {
    width: fit-content;
    margin-top: 24px;
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

export const InputsWrapper = styled.div`
  width: 100%;
`;

export const ItemWrapper = styled.div`
  margin-bottom: 14px;
  width: 100%;
`;

export const TextSecondary = styled.p`
  font-size: ${fontSizes.f12};
  font-weight: 700;
`;

export const ButtonAdd = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
`;
