import moment from "moment";
import { CellNameWrapper } from "app/student/new-students/components/table/style";
import React, { useCallback, useMemo } from "react";
import { DATE_FORMAT_SHOW_MMM, DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { IContacts } from "types/contact";

const PeriodsCell = ({
  row,
  queryKeys,
}: {
  row: any;
  queryKeys: string[] | string;
  disabled?: boolean;
  onSuccess?: () => void;
}) => {
  const data: IContacts = row;
  const dispatch = useDispatch();
  const start = data?.actualPayment?.start_date;
  const end = data?.actualPayment?.finish_date;

  const a = useMemo(
    () =>
      (start
        ? moment(start, DATE_FORMAT_YYYY_MM_DD).format(DATE_FORMAT_SHOW_MMM)
        : "_") +
      " - " +
      (end
        ? moment(end, DATE_FORMAT_YYYY_MM_DD).format(DATE_FORMAT_SHOW_MMM)
        : "_"),
    [start, end],
  );

  const handleOpenModal = useCallback(() => {
    if (data?.buttonActions?.can_change_start_date)
      dispatch(
        toggleModal({
          key: "changeStartDate",
          data: {
            open: true,
            data: {
              id: data?.id,
              queryKeys: queryKeys,
              start_date: start,
              student: data,
            },
          },
        }),
      );
  }, [data?.buttonActions?.can_change_start_date, start]);

  return (
    <CellNameWrapper onClick={() => handleOpenModal()}>
      <p className="name period">{a}</p>
    </CellNameWrapper>
  );
};

export default PeriodsCell;
