import styled from "@emotion/styled";

export const Wrapper = styled.div<{ width: string }>`
  max-width: ${(props) => props.width};
  .swiper-slide {
    width: 200px !important;
  }
`;
