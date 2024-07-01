import { ETaskStatus, ITaskEnums, TParams } from "types";
import { toast } from "react-toastify";
import { Flex } from "antd";
import { Cell, TaskId } from "components";
import React from "react";
import tasks from "api/tasks";

export const fetchSearchTask = async ({
  params,
  dataEnums,
  ids,
}: {
  params: TParams;
  dataEnums: ITaskEnums | undefined;
  ids: any;
}) => {
  const isSearching = params?.search?.length > 2;
  if (isSearching || !!ids?.length)
    try {
      //req params
      const reqParams = {
        query_params: {
          ...params,
          id: isSearching ? [] : ids,
          status: [ETaskStatus.OPENED, ETaskStatus.DONE, ETaskStatus.CHECKED],
          fields: "id,description,status",
        },
      };

      const res = await tasks.getTasks(reqParams);

      const data = res?.data?.result;

      return data?.map((item) => {
        const color =
          dataEnums?.TaskStatusColorEnum[`${item.status}`]?.ACTIVE_BOX!;
        return {
          value: item?.id?.toString(),
          label: (
            <Flex gap={10} style={{ height: 30 }}>
              <TaskId id={item.id} color={color} state={item.state} />
              <Cell display="flex" style={{ alignItems: "center" }}>
                {item.description}
              </Cell>
            </Flex>
          ),
          additional: item,
          extra: `${item?.id} ${item?.description}`,
        };
      });
    } catch (err: any) {
      toast.error(err?.message);
    }
};
