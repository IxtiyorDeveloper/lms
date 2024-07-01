import { QueryClient } from "@tanstack/react-query";

export const updateList = ({
  newData,
  queryClient,
  queryKeys,
}: {
  newData: any;
  queryKeys: string[];
  queryClient: QueryClient;
}) => {
  queryClient.setQueriesData(queryKeys, (oldData: any) => {
    const data = oldData;
    return {
      ...data,
      data: {
        ...data?.data,
        list: data?.data?.list?.map((e: any) => {
          if (e.id === newData.id) {
            return newData;
          }
          return e;
        }),
      },
    };
  });
};
