import styled from "@emotion/styled";
import { textColors } from "styles/theme";

export const LinkButton = styled.a`
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 8px 18px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  font-size: 15px;
  border-radius: 40px;
  text-decoration: unset;
  color: ${textColors.dark};
`;

export const ImageSite = styled.div`
  position: relative;
  width: 50%;
  padding: 20px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }

  @media (max-width: 991px) {
    display: none;
  }
`;
