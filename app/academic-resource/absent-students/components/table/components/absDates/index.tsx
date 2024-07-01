import { IAbsDate } from "types/absentStudents";
import { AbsWr, AbsCol, Row } from "./style";
import { EAttendanceStatuses, TStatuses } from "types";
import { Empty } from "antd";
import React from "react";
import { NotComeSvg } from "components";
import { bgColors } from "styles/theme";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";

const icons: { [key in TStatuses]?: any } = {
  [EAttendanceStatuses.NOT_CAME]: <NotComeSvg width={20} height={20} />,
  [EAttendanceStatuses.ABS]: (
    <NotComeSvg bgColor={bgColors.primary} width={20} height={20} />
  ),
};
export const AbsDates = ({ original }: { original: any }) => {
  const data: IAbsDate[] | undefined = original?.absDates;
  const dispatch = useDispatch();
  const handleClickRow = ({ item }: { item: IAbsDate }) => {
    dispatch(
      toggleModal({
        key: "absModal",
        data: {
          data: { original, item },
          open: true,
        },
      })
    );
  };

  return (
    <>
      {data?.length ? (
        <AbsWr>
          <Row>
            {data?.map((item, index) => {
              return (
                <AbsCol key={index} onClick={() => handleClickRow({ item })}>
                  <p>{item?.date}</p>
                  <div>{icons[item?.status as unknown as TStatuses]}</div>
                </AbsCol>
              );
            })}
          </Row>
        </AbsWr>
      ) : (
        <AbsWr>
          <Empty description={false} />
        </AbsWr>
      )}
    </>
  );
};
