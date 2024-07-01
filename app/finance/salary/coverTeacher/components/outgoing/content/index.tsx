import React, { FC } from "react";
import { IContent } from "./type";
import {
  Wrapper,
  Container,
  CoverRow,
  Left,
  Right,
  RowContainer,
} from "./style";
import RightCoverItem from "../rightCoverItem";
import { DoubleArrowSvg } from "components";
import LeftCoverItem from "../leftCoverItem";

const Content: FC<IContent> = ({ data, settings }) => {
  return (
    <Wrapper>
      <Container>
        {data?.map((item, index) => {
          return (
            <CoverRow key={index}>
              <Right>
                {item?.user_covers?.map((currentCover, currentCoverIndex) => {
                  return (
                    <RowContainer>
                      <LeftCoverItem
                        key={currentCoverIndex}
                        cover={currentCover}
                        isFirst={currentCoverIndex === 0}
                        isLast={
                          currentCoverIndex + 1 == item?.user_covers?.length
                        }
                        mainCover={item}
                      />
                    </RowContainer>
                  );
                })}
              </Right>
              <div className="svg">
                <DoubleArrowSvg />
              </div>
              <Left>
                <RightCoverItem cover={item} />
              </Left>
            </CoverRow>
          );
        })}
      </Container>
    </Wrapper>
  );
};

export default Content;
