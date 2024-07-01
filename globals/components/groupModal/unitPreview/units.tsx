import React from "react";
import { StyledCol, TopCell, UnitsWrapper } from "./style";
import { Empty } from "antd";
import { IRestructuredUnit } from "../type";
import moment from "moment";
import { headerGenerateForPreview } from "./utils";
import {
  LESSON_DAY_MAIN_EXAM,
  LESSON_DAY_HOLIDAY,
  LESSON_DAY_SPEAKING_EXAM,
} from "constants/lessonDayEnums";

const Units = ({
  restructuredUnits,
}: {
  restructuredUnits: IRestructuredUnit[] | undefined;
}) => {
  if (restructuredUnits)
    return (
      <UnitsWrapper>
        {restructuredUnits?.map((item, index) => {
          return (
            <div className="row" key={index}>
              <p className="title">{moment(item?.date).format("MMMM")}</p>
              <div className="grids">
                <div className="inside-row">
                  {item?.data?.map((item, index) => {
                    return (
                      <StyledCol length={item?.units?.length > 1} key={index}>
                        <TopCell
                          isHoliday={
                            item.status.toString() ==
                              LESSON_DAY_HOLIDAY.toString() ||
                            item.status.toString() ==
                              LESSON_DAY_MAIN_EXAM.toString() ||
                            item.status.toString() ==
                              LESSON_DAY_SPEAKING_EXAM.toString()
                          }
                        >
                          {moment(item?.date).format("DD")}{" "}
                          {moment(item?.date).format("dddd").substring(0, 3)}
                        </TopCell>
                        <div className="bottom">
                          {headerGenerateForPreview({ item })}
                        </div>
                      </StyledCol>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </UnitsWrapper>
    );
  else return <Empty />;
};

export default Units;
