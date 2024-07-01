import React, { FC, ReactNode, useEffect, useState } from "react";
import { DraggableTable } from "components";
import { TGroupType } from "types/groupType";
import { ILevel } from "types";
import { ILessonDay } from "types/lessonDay";
import { useReorderLevel } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

interface IStyledTable {
  data: TGroupType[] | ILevel[] | ILessonDay[] | undefined;
  columns: Array<any>;
  isLoading?: boolean;
  isDisabled?: boolean;
  columnWidths?: ReactNode;
}

const StyledTable: FC<IStyledTable> = ({
  data,
  columns,
  isLoading,
  columnWidths,
  isDisabled = true,
}) => {
  const queryClient = useQueryClient();
  const reorderLevel = useReorderLevel({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.admin_course_view]);
      toast.success("Success");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const handleReorder = (data: TGroupType[] | ILevel[] | ILessonDay[]) => {
    reorderLevel.mutate({
      query_params: {
        course_id: 1,
      },
      body: {
        orders: data?.map((item) => item?.id),
      },
    });
  };
  const [tableData, setTableData] = useState(data);
  useEffect(() => {
    setTableData(data);
  }, [data]);
  return (
    <DraggableTable
      columnWidths={columnWidths}
      columns={columns ?? []}
      data={tableData ?? []}
      disabled={isDisabled}
      setData={setTableData}
      isLoading={isLoading}
      handleReorder={handleReorder}
      paddingRow={0}
    />
  );
};

export default StyledTable;
