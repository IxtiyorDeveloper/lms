import React, { useMemo } from "react";
import { AsButton, BodyCell, Cell, ExamWrapper, Header } from "./style";
import { ToHourMinute } from "utils/toHourMinute";
import { IObjTimeTable, ISupportTimeTable } from "types";
import { generateName } from "../../utils/generateName";
import moment from "moment";
import { specifyType } from "../../utils/specifyType";
import { checkToday } from "../../utils/checkToday";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { OFFICE_HOUR_DATE } from "constants/support";
import { MainSvg, SpeakingTeacherSvg } from "components";
import { isDateAfter } from "../../utils/checkExamDate";
import { ButtonType } from "./type";

const Columns = ({
  data,
  loading,
}: {
  data: ISupportTimeTable | undefined;
  loading: boolean;
}) => {
  const dispatch = useDispatch();
  const handlePopUp = ({
    type,
    data,
  }: {
    type: ButtonType | undefined;
    data: IObjTimeTable;
  }) => {
    if (type === ButtonType.WAITING || type === ButtonType.ACCEPTED)
      dispatch(
        toggleModal({
          key: "officeHours",
          data: {
            data: data,
            open: true,
          },
        })
      );
  };
  return useMemo(() => {
    let array: any = [];
    if (data && !loading) {
      for (const [index, [key, value]] of Object.entries(data).entries()) {
        const isToday = checkToday({ day: key });
        array = [
          ...array,
          {
            title: (
              <Header>
                <div className={`content ${isToday ? "today" : "not-today"}`}>
                  {moment(key).format("dddd")}
                </div>
              </Header>
            ),
            dataIndex: key,
            render: (currentValue: any, record: any, index: number) => {
              const time = ToHourMinute(record);
              const obj: IObjTimeTable = data?.[key]?.[time];
              const isAfter = isDateAfter({ date: key, time: record });
              if (obj?.type == OFFICE_HOUR_DATE.REGULAR_DAY) {
                if (
                  obj.officeHour &&
                  !!obj.officeHour?.activeOfficeHourCandidates?.length
                ) {
                  const result = generateName(obj);
                  const type = specifyType(obj);

                  return (
                    <BodyCell>
                      <AsButton
                        className={type}
                        onClick={() => handlePopUp({ type, data: obj })}>
                        <p className="name">{result?.name}</p>{" "}
                        {!!result?.number && (
                          <p className="number">({result?.number})</p>
                        )}
                      </AsButton>
                    </BodyCell>
                  );
                } else
                  return (
                    <BodyCell>
                      <AsButton
                        className={`empty ${isAfter ? "after" : "before"}`}>
                        <p className="empty">Empty</p>
                      </AsButton>
                    </BodyCell>
                  );
              }
              if (obj?.type == OFFICE_HOUR_DATE.MAIN_EXAM_DATE) {
                return (
                  <ExamWrapper>
                    <div className={`content ${isAfter ? "after" : "before"}`}>
                      <div className="left">
                        <MainSvg />
                      </div>
                      <p className="name">EXAM: {obj?.exam?.group?.name}</p>
                    </div>
                  </ExamWrapper>
                );
              }
              if (obj?.type == OFFICE_HOUR_DATE.SPEAKING_EXAM_DATE) {
                const isAfter = isDateAfter({ date: key, time: record });
                return (
                  <ExamWrapper>
                    <div className={`content ${isAfter ? "after" : "before"}`}>
                      <div className="left">
                        <SpeakingTeacherSvg />
                      </div>
                      <p className="name">SPEAKING: {obj?.exam?.group?.name}</p>
                    </div>
                  </ExamWrapper>
                );
              }
            },
          },
        ];
      }
    }

    return [
      {
        title: (
          <Header>
            <div className="info">Timetable</div>
          </Header>
        ),
        dataIndex: "info",
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>
              <p className="time">{ToHourMinute(record)}</p>
            </Cell>
          );
        },
      },
      ...array,
    ];
  }, [data]);
};

export default Columns;
