import React, { FC } from "react";
import { IContent } from "./type";
import { restructureDataByReceiverId } from "../../calendarFilter/functions";
import {
  Container,
  CoverRow,
  DayCovers,
  Left,
  Right,
  RowContainer,
  Wrapper,
} from "./style";
import { DoubleArrowSvg } from "components";
import LeftCoverItem from "../leftCoverItem";
import RightCoverItem from "../rightCoverItem";

const Content: FC<IContent> = ({ settings, data }) => {
  return (
    <Wrapper>
      <Container>
        <DayCovers>
          {data?.map((item, index) => {
            return (
              <CoverRow key={index}>
                <Left>
                  <LeftCoverItem cover={item} />
                </Left>
                <div className="svg">
                  <DoubleArrowSvg />
                </div>
                <Right>
                  {item?.covers_for_teacher?.map(
                    (currentCover, currentCoverIndex) => {
                      return (
                        <RowContainer>
                          <RightCoverItem
                            key={currentCoverIndex}
                            cover={currentCover}
                            isFirst={currentCoverIndex === 0}
                            isLast={
                              currentCoverIndex + 1 ==
                              item?.covers_for_teacher?.length
                            }
                            mainCover={item}
                          />
                        </RowContainer>
                      );
                    }
                  )}
                </Right>
              </CoverRow>
            );
          })}
        </DayCovers>
      </Container>
    </Wrapper>
  );
};

export default Content;
