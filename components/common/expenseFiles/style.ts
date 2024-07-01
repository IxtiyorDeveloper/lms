import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Container = styled.div``;

export const Wrapper = styled.div`
  padding: 10px 20px;

  .container {
    display: flex;
    flex-direction: column;

    .items {
      display: flex;
      gap: 5px;

      a {
        width: 100%;
        font-weight: 500;
        font-size: ${fontSizes.f12};
        line-height: 1;
        letter-spacing: -0.01em;
        color: ${textColors.dark};

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

export const Flex = styled.div`
  display: flex;
  gap: 10px;
  cursor: pointer;
`;
