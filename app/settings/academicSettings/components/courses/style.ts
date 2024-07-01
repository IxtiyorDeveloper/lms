import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  border-top: 1px solid ${bgColors.whiteSmoke};
`;
export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(267px, 1fr));
  gap: 16px;
`;
export const Course = styled.div`
  border: 0.1px solid ${bgColors.brotherBlue};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  border-radius: ${borders.b10};
  overflow: hidden;
`;
export const ImgWrapper = styled.div`
  background: ${bgColors.lemon};
  padding-bottom: 20px;
  .img {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    margin-top: 30px;
  }
`;
export const ImgContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 24px 24px 0 24px;
  align-items: center;

  .title {
    width: 70%;
    font-weight: 600;
    font-size: ${fontSizes.f16};
    line-height: 32px;
    color: ${textColors.dark};
  }

  .icons {
    width: 30%;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: flex-end;
    svg {
      cursor: pointer;
    }
  }
`;
export const ContentWrapper = styled.div`
  padding: 18px 24px 24px 24px;
`;
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  .text {
    display: flex;
    gap: 10px;
    align-items: center;

    p {
      font-weight: 500;
      font-size: ${fontSizes.f12};
      line-height: 24px;
      display: flex;
      align-items: center;
      color: ${textColors.yourShadow};
    }
  }

  .count {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 24px;
    display: flex;
    align-items: center;
    color: ${textColors.sceptreBlue};
  }
  margin-bottom: 12px;
`;
