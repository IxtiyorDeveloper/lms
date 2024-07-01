import React, { useRef } from "react";
import moment from "moment/moment";
import { useRouter } from "next/router";
import PageTable from "./components/table";
import { Container, Wrapper } from "./style";
import SelectMonth from "components/common/selectMonth";
import { useAdminV1SecretClientCycleIndex } from "hooks";
import { PlusSvg } from "@jasurbekyuldashov/lms-web-icons";
import { Button, RedBadgeTitle, Segmented } from "components";
import CreateModal from "./components/createModal";

const SecretClient = () => {
  const router = useRouter();
  const ref = useRef<any>();

  const { isLoading, data } = useAdminV1SecretClientCycleIndex({
    query_params: {
      type: (router.query.tabId as string) || 100, // type = 100 Internal || type = 200 External
      year: router.query.year || moment().format("YYYY"),
      month: router.query.month || moment().format("MM"),
      expand: "reviews.user.userProfile.avatar",
    },
    keepPreviousData: true,
  });

  return (
    <Wrapper>
      <div className="header">
        <Segmented
          options={[
            { label: "Internal secret client", value: "100" },
            { label: "External secret client", value: "200" },
          ]}
          initValue={(router.query.tabId as string) || "100"}
          routerKey="tabId"
        />
        <SelectMonth
          onChange={(e) => {
            const date = moment(e);
            router.replace(
              {
                pathname: router.pathname,
                query: {
                  ...router.query,
                  year: date.format("YYYY"),
                  month: date.format("M"),
                },
              },
              undefined,
              { scroll: false },
            );
          }}
          initValue={moment(
            `${router.query.year || moment().format("YYYY")} ${
              router.query.month || moment().format("MM")
            }`,
            "YYYY MM",
          ).format("MMMM YYYY")}
        />
      </div>
      <Container>
        <div className="flex title-container">
          <RedBadgeTitle
            title={
              router.query.tabId === "200"
                ? "External secret clients"
                : "Internal secret clients"
            }
            count={data?.meta?.totalCount || 0}
          />
          <Button onClick={() => ref.current?.open?.()}>
            <PlusSvg />
            Create cycle
          </Button>
        </div>
        <PageTable isFetching={isLoading} data={data} />
      </Container>
      <CreateModal ref={ref} />
    </Wrapper>
  );
};

export default SecretClient;
