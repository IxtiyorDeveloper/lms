import { Empty, Steps } from "antd";
import React, { useMemo } from "react";
import { Wrapper } from "./style";
import { bgColors } from "styles/theme";
import Card from "./card";
import { useLifeCycleList } from "hooks";
import { useRouter } from "next/router";
import { ILifeCyclePageData } from "types/lifeCycle";
import { icons } from "../../data";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import { SessionSvg, MyPagination } from "components";
import dayjs from "dayjs";

const LifeCycleTable = ({
  pageData,
}: {
  pageData: ILifeCyclePageData | undefined;
}) => {
  const router = useRouter();
  const pageSize = router.query.pageSize?.toString() || 20;
  const { created_by_sidebar, created_by_top_filter, ...rest } = router.query;
  const created_by_sidebar_array =
    typeof created_by_sidebar === "string"
      ? [created_by_sidebar]
      : created_by_sidebar;
  const created_by_top_filter_array =
    typeof created_by_top_filter === "string"
      ? [created_by_top_filter]
      : created_by_top_filter;
  const mergedArray = [
    ...(created_by_sidebar_array || []),
    ...(created_by_top_filter_array || []),
  ].filter((value, index, self) => self.indexOf(value) === index);

  const today = dayjs().format("YYYY-MM-DD HH:mm");

  const startOfMonth = dayjs().startOf("month").format("YYYY-MM-DD HH:mm");

  const { data, isLoading, isPreviousData } = useLifeCycleList({
    ...rest,
    created_by: mergedArray,
    from_date: router.query?.from_date || startOfMonth,
    to_date: router.query?.to_date || today,
    page: router.query?.page,
    pageSize: router.query?.pageSize,
    expand: "createdBy.userProfile.avatar.children",
  });

  const items = useMemo(() => {
    return data?.list?.map((item) => {
      const scenario = Object.entries(pageData?.models.models || {}).find(
        ([key, value]) => value?.includes(item?.scenario),
      )?.[0];
      const Icon: any =
        icons?.find((item) => item.id?.toString() === scenario?.toString())
          ?.icon ?? SessionSvg;
      return {
        icon: <Icon width={20} height={20} color={bgColors.white} />,
        description: <Card data={item} pageData={pageData} />,
      };
    });
  }, [data, pageData]);

  return (
    <Wrapper>
      {isLoading || isPreviousData ? (
        <div className="skeleton">
          <Stack spacing={1}>
            {Array.from(Array(10).keys())?.map((item, key) => {
              return <Skeleton key={`skeleton_key_${key}`} />;
            })}
          </Stack>
        </div>
      ) : (
        <div className="items">
          {data?.list?.length === 0 || !data ? (
            <Empty />
          ) : (
            <div>
              <Steps direction="vertical" items={items} />
              <div className="pagination">
                <div className="pagination-wrapper">
                  <MyPagination
                    current={data?.meta?.currentPage}
                    total={data?.meta?.totalCount}
                    pageCount={data?.meta?.pageCount}
                    pageSize={+pageSize}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default LifeCycleTable;
