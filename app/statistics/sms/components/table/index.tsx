import React, { FC, useEffect, useMemo } from "react";
import { ProjectsTabsWrapper, TableWrapper } from "./style";
import { Segmented } from "components";
import AutoSMS from "./components/autoSms";
import { ISmsDelivery } from "types/statistics/sms";
import Router, { useRouter } from "next/router";
import { usePageDataMemo } from "hooks";

interface IProps {
  dataForCounts: any;
  data: ISmsDelivery | undefined;
  isLoading: boolean;
  isPreviousData: boolean;
}

export enum ETypeSMSDelivery {
  auto = 100,
  manual = 200,
}

const TableComponent: FC<IProps> = (props) => {
  const router = useRouter();
  const { dataForCounts, data, isPreviousData, isLoading } = props;

  const select = usePageDataMemo();

  const counts = useMemo(() => {
    return {
      auto:
        Number(
          dataForCounts?.smsTotal?.total?.filter(
            (a: any) => a.label === "Auto",
          )[0]?.count,
        ) || 0,
      manual:
        Number(
          dataForCounts?.smsTotal?.total?.filter(
            (a: any) => a.label === "Manual",
          )[0]?.count,
        ) || 0,
    };
  }, [dataForCounts]);

  const projectsTab: any[] | undefined = select.projectListByPermission?.map(
    (project) => {
      return {
        label: project.label,
        value: project.value,
      };
    },
  );

  useEffect(() => {
    if (!router.query?.project && projectsTab) {
      router.replace(
        {
          query: {
            ...router.query,
            project: projectsTab?.[0]?.value,
          },
        },
        undefined,
        {
          scroll: false,
        },
      );
    }
  }, [projectsTab]);

  return (
    <TableWrapper>
      <ProjectsTabsWrapper>
        <Segmented
          options={projectsTab || []}
          routerKey="project"
          initValue={
            Router.query?.project
              ? (Router.query?.project as string)
              : projectsTab && projectsTab[0].value
          }
          watchInitialValue
        />
      </ProjectsTabsWrapper>
      <div className="tabs">
        <Segmented
          initValue={(Router.query?.type as string) || "100"}
          routerKey="type"
          options={[
            {
              children: (
                <AutoSMS
                  data={data}
                  isPreviousData={isPreviousData}
                  isLoading={isLoading}
                />
              ),
              label: <p className="tab-element">Auto sms ({counts.auto})</p>,
              value: "100",
            },
            {
              children: (
                <AutoSMS
                  type={ETypeSMSDelivery.manual}
                  data={data}
                  isPreviousData={isPreviousData}
                  isLoading={isLoading}
                />
              ),
              label: <p className="tab-element">Manual ({counts.manual})</p>,
              value: "200",
            },
          ]}
        />
      </div>
    </TableWrapper>
  );
};

export default TableComponent;
