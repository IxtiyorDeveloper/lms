import React, { FC, useState } from "react";
import { TableColumns } from "./components/tableCols";
import { Button, FilledSmsSvg, AntdTable } from "components";
import { tableCols } from "./components/forTab";
import { SmsWrapper } from "./components/style";
import { ReturnModal } from "../returnModal";
import { useRouter } from "next/router";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { TablePaginationConfig } from "antd/lib";

const TableComponent: FC<{
  data: any;
  name: number;
  isLoading: boolean;
  pagination?: TablePaginationConfig;
}> = ({ data, name, isLoading, ...args }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selected, setSelected] = useState<any>({
    isOpen: false,
    data: null,
  });

  const options = () => ({
    activeCols: tableCols[name as keyof typeof tableCols],
    setSelected,
    tab_id: router.query?.tab_id || "100",
  });
  return (
    <div>
      <SmsWrapper>
        <Button
          onClick={() => {
            dispatch(
              toggleModal({
                key: "groupSms",
                data: {
                  data: {
                    filter: "balance",
                  },
                  open: true,
                },
              })
            );
          }}
        >
          <FilledSmsSvg />
        </Button>
      </SmsWrapper>
      <AntdTable
        columns={TableColumns(options())}
        dataSource={data || []}
        loading={isLoading}
        {...args}
      />
      <ReturnModal
        open={selected.isOpen}
        data={selected.data}
        setSelected={setSelected}
        selected={selected}
      />
    </div>
  );
};

export default TableComponent;
