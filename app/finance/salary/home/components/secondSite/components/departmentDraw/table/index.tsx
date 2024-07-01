import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { TableWrapper } from "./style";
import { useTableExpand } from "hooks";
import Columns from "./components/columns";
import { ISalaryMain } from "types/finance/salary";
import { TAssignment } from "types";
import { Table } from "antd";
import Sticky from "react-stickynode";
import Header from "./components/header";
import { useForm } from "react-hook-form";
import debounce from "lodash/debounce";
import { Footer } from "./components/footer";
import HeadSide from "./components/headSide";
import Collapse from "./components/collapse";
import { getColumns } from "./components/utils/getColumns";

const TableComponent: FC<{
  title: string;
  count: number;
  index: string;
  data: ISalaryMain;
}> = ({ index, title, count, data }) => {
  const myRef = useRef<any>(null);
  const { onRowClick, expandedRowKeys } = useTableExpand();
  //subcomponent of the row
  const renderRowSubComponent = React.useCallback(
    ({ row }: { row: { original: TAssignment } }) => {
      return <Collapse data={row?.original?.salaryComponents} row={row} />;
    },
    [],
  );

  const { control, watch } = useForm({
    defaultValues: {
      branch: [],
      increase: true,
      decrease: true,
      equal: true,
      high: true,
      normal: true,
      low: true,
      unclear: true,
      full_name: "",
    },
  });

  const assignments = data?.assignments;
  const difference = data?.difference;

  const watchAll = watch();

  const cols = useMemo(() => {
    return getColumns({ assignments, difference, watchAll });
  }, [assignments, difference, watchAll]);

  const debouncedFunc = useCallback(() => {
    myRef.current?.scrollIntoView({
      behavior: "smooth", // Adds smooth scrolling animation
      block: "start", // Scrolls to the top of the element
      inline: "nearest", // Scrolls to the nearest edge of the element
    });
  }, []);

  const handleFullName = useCallback(
    debounce(() => {
      debouncedFunc();
    }, 400),
    [],
  );

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "full_name" && type === "change") {
        handleFullName();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const { filtered, ...rest } = cols;

  return (
    <TableWrapper
      id={`table_${index}`}
      className={`tablefixed`}
      ref={myRef}
      children={
        <div>
          <HeadSide
            data={data}
            header={cols.header}
            control={control}
            watch={watch}
          />
          <Sticky innerZ={10} enabled={true} top={72}>
            <Header control={control} />
          </Sticky>
          <Table
            columns={Columns({ data })}
            expandable={{
              expandedRowRender: (record: any) =>
                renderRowSubComponent({ row: { original: record } }),
              expandedRowKeys,
              expandIcon: () => null,
            }}
            rowKey="id"
            dataSource={cols.filtered}
            pagination={false}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  onRowClick({ id: record?.id });
                }, // click row
              };
            }}
            rowClassName={(record) => {
              return `row-${record.staff_status}`;
            }}
            footer={() =>
              Footer({
                ...rest,
                data,
              })
            }
            // onRow={onRowClick}
          />
        </div>
      }
    />
  );
};

export default TableComponent;
