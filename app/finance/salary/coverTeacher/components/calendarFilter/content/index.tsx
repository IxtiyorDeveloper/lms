import React, { FC } from "react";
import {
  Wrapper,
  DateWrapper,
  Container,
  CoverRow,
  Left,
  DayCovers,
  Right,
  RowContainer,
  ChangeWrapper,
} from "./style";
import { IContent } from "./type";
import moment from "moment";
import { DATE_FORMAT_MMM_DD_YYYY } from "constants/dates";
import LeftCoverItem from "../leftCoverItem";
import RightCoverItem from "../rightCoverItem";
import { DeleteSvg, DoubleArrowSvg, EditSvg } from "components";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { CoverActions } from "types/finance/salary";

const Content: FC<IContent> = ({ data, settings, mainData }) => {
  const dispatch = useDispatch();
  const handleDelete = ({ id, date }: { id: number; date: string }) => {
    dispatch(
      toggleModal({
        key: "deleteCoverTeacher",
        data: {
          data: {
            id,
            date,
          },
          open: true,
        },
      })
    );
  };
  const handleEdit = ({ id, date }: { id: number; date: string }) => {
    dispatch(
      toggleModal({
        key: "coverTeacher",
        data: {
          data: {
            id,
            date,
            data: mainData,
            settings,
            type: CoverActions.UPDATE,
          },
          open: true,
        },
      })
    );
  };

  return (
    <Wrapper>
      {data?.reverse()?.map((item, index) => {
        return (
          <Container key={index}>
            <DateWrapper>
              {moment(item?.date).format(DATE_FORMAT_MMM_DD_YYYY)}
            </DateWrapper>
            <DayCovers>
              {item?.data?.map((cover, coverIndex) => {
                return (
                  <CoverRow key={coverIndex}>
                    <Left>
                      <LeftCoverItem cover={cover} />
                    </Left>
                    <div className="svg">
                      <DoubleArrowSvg />
                    </div>
                    <Right>
                      {cover?.covers_for_teacher?.map(
                        (currentCover, currentCoverIndex) => {
                          return (
                            <RowContainer>
                              <RightCoverItem
                                key={currentCoverIndex}
                                cover={currentCover}
                                isFirst={currentCoverIndex === 0}
                                isLast={
                                  currentCoverIndex + 1 ==
                                  cover?.covers_for_teacher?.length
                                }
                                mainCover={cover}
                              />
                              <div className="right">
                                {currentCoverIndex === 0 && (
                                  <ChangeWrapper>
                                    <div
                                      className="box"
                                      onClick={() =>
                                        handleEdit({
                                          id: cover?.receiver?.id,
                                          date: item?.date,
                                        })
                                      }
                                    >
                                      <EditSvg />
                                    </div>
                                    <div
                                      className="box"
                                      onClick={() =>
                                        handleDelete({
                                          id: cover?.receiver?.id,
                                          date: item?.date,
                                        })
                                      }
                                    >
                                      <DeleteSvg />
                                    </div>
                                  </ChangeWrapper>
                                )}
                              </div>
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
        );
      })}
    </Wrapper>
  );
};

export default Content;
