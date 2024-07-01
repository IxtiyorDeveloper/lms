import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  .teachers {
    display: flex;
    gap: 36px;
    align-items: center;
    justify-content: center;
    padding: 32px 60px 14px 60px;
    flex-wrap: wrap;

    .item:nth-child(2) {
      margin-top: -20px;
    }
  }

  .btn {
    display: flex;
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
    color: ${bgColors.primary};
    font-size: ${fontSizes.f16};
    font-weight: 500;
    border-radius: 48px;
    background: #090a0a;
    cursor: pointer;
    align-self: center;
  }
`;

export const Item = styled.div<{ image: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 160px;

  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-align: center;
    color: #090a0a;
    font-size: ${fontSizes.f14};
    font-weight: 500;
    line-height: 1; /* 100% */
    margin-top: 12px;
  }
  .img-c {
    img {
      outline: 6px solid ${bgColors.purpleCrystal}!important;
      z-index: -1;
    }
  }

  .avatar {
    width: 95px;
    height: 95px;
    border-radius: 50%;
    // background: url(${(props) => props.image}),
    //   lightgray -93.588px -35.936px / 317.75% 268.034% no-repeat;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .ranking {
    background: linear-gradient(180deg, #636363 0%, #000 100%);
    border-radius: 50%;
    padding: 4px;
    z-index: 2;
  }

  .ranking:nth-child(2) {
    margin-top: -19px;
  }
`;
