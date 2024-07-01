import React, { FC, useEffect, useRef } from "react";
import { IAbsDate } from "types/absentStudents";
import { useGetGroupDays } from "hooks";
import { Spin } from "antd";
import { Wrapper } from "./style";
import moment from "moment";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { IContacts } from "types/contact";
import { EAttendanceStatuses, TStatuses } from "types";
import { NotComeSvg } from "../../elements";
import { bgColors } from "styles/theme";
import { useDispatch } from "react-redux";
import { toggleModal } from "store";
import { mergeUnits } from "utils/mergeUnits";

const icons: { [key in TStatuses]?: any } = {
  [EAttendanceStatuses.NOT_CAME]: <NotComeSvg width={38} height={38} />,
  [EAttendanceStatuses.ABS]: (
    <NotComeSvg bgColor={bgColors.primary} width={38} height={38} />
  ),
};

interface IProps {
  original?: IContacts;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  queryKeys?: string[];
}

const AbsMergedWithUnit: FC<IProps> = ({ original, setVisible, queryKeys }) => {
  const absDates: IAbsDate[] | undefined = original?.absDates;

  const { data, isFetching } = useGetGroupDays({
    query_params: {
      group: original?.group.id,
      expand: "unit, unit.parent_unit",
    },
  });

  const containerRef = useRef<HTMLDivElement | any>();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [data]);
  const dispatch = useDispatch();
  const handleClickRow = ({ item }: { item: IAbsDate }) => {
    setVisible?.(false);
    dispatch(
      toggleModal({
        key: "absModal",
        data: {
          data: { original, item, queryKeys },
          open: true,
        },
      }),
    );
  };

  return (
    <Spin spinning={isFetching}>
      <Wrapper>
        <div className="container" ref={containerRef} style={{}}>
          {absDates?.map((e: IAbsDate) => {
            const units = data?.find(
              (un) => moment(un?.date).endOf("day").diff(e.date, "day") === 0,
            );
            return (
              <div className="item" onClick={() => handleClickRow({ item: e })}>
                <div className="day">
                  {moment(e.date, DATE_FORMAT_YYYY_MM_DD).format("D MMM")}
                </div>
                <div className="unit">{mergeUnits(units?.units)}</div>
                <div className="icon">
                  {icons[e?.status as unknown as TStatuses]}
                </div>
              </div>
            );
          })}
        </div>
      </Wrapper>
    </Spin>
  );
};

export default AbsMergedWithUnit;
