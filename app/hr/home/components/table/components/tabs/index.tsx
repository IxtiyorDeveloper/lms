import { useMemo } from "react";
import { InitialDataHR } from "types";
import { bgColors, textColors } from "styles/theme";
import AntdBadge from "components/common/antdBadge";
import { Count, Label, TabSection } from "./style";
import { useRouter } from "next/router";
import { CandidateStatus } from "constants/hr";
import { ICount } from "../..";

interface Interface {
  children: JSX.Element;
  title: (isActive: boolean) => JSX.Element;
  isShow: boolean;
}

const Tabs: ({
  counts,
  isLoading,
  isCandidateStatus,
  initialData,
}: {
  isLoading?: boolean;
  isCandidateStatus?: boolean;
  initialData: InitialDataHR | undefined;
  counts?: ICount[];
}) => Interface[] = ({ isLoading, counts, isCandidateStatus, initialData }) => {
  const router = useRouter();
  const { status } = router.query;

  const stageList = initialData?.stageList;
  const vacancyList = initialData?.vacancyList;
  // const vacancyList = initialData?.vacancyList.sort(
  //   (a, b) => Number(a.order) - Number(b.order)
  // );

  let tabs: any = [];
  if (vacancyList && !isCandidateStatus) {
    for (let i = 0; i < vacancyList?.length; i++) {
      const value = vacancyList[i];
      tabs = [
        ...tabs,
        {
          id: value?.id,
          title: (isActive: boolean) => (
            <TabSection
              href={{
                pathname: "/hr",
                query: {
                  status,
                  vacancy_id: value?.id,
                  roundedTabIndex: value?.id,
                },
              }}
              style={{
                backgroundColor: value?.color,
                opacity: isActive ? 1 : 0.4,
                color: isActive ? bgColors.white : bgColors.black,
                boxShadow: isActive
                  ? `0px 2px 6px 0px rgba(0, 0, 0, 0.40)`
                  : "none",
                border: `2px solid ${
                  isActive ? bgColors.primary : "transparent"
                }`,
              }}>
              <Label>
                <p>{value?.title}</p>
                <Count>
                  <AntdBadge
                    showZero
                    color={isActive ? bgColors.pop : bgColors.soulfulBlue}
                    content={
                      counts?.find((item) => +item.id == +value?.id)?.count || 0
                    }
                  />
                </Count>
              </Label>
            </TabSection>
          ),
          isShow: true,
          query: {
            with_tabs: 1,
            page: 1,
            pageSize: 20,
            vacancy_id: value?.id,
          },
        },
      ];
    }
  }
  if (isCandidateStatus && stageList) {
    for (let i = 0; i < stageList?.length; i++) {
      const value = stageList[i];
      tabs = [
        ...tabs,
        {
          id: value?.value,
          title: (isActive: boolean) => (
            <TabSection
              href={{
                pathname: "/hr",
                query: {
                  status: CandidateStatus.CANDIDATE,
                  stage: value?.value,
                  roundedTabIndex: value?.value,
                },
              }}
              style={{
                backgroundColor: value?.color,
                opacity: isActive ? 1 : 0.4,
                boxShadow: isActive
                  ? `0px 2px 6px 0px rgba(0, 0, 0, 0.40)`
                  : "none",
                border: `2px solid ${
                  isActive ? bgColors.primary : "transparent"
                }`,
              }}>
              <Label
                style={{
                  color: textColors.dark,
                }}>
                <p>{value?.label}</p>
                <Count>
                  <AntdBadge
                    showZero
                    color={isActive ? bgColors.pop : bgColors.soulfulBlue}
                    content={
                      counts?.find(
                        (item) => Number(item?.stage) == Number(value?.value)
                      )?.count ?? 0
                    }
                  />
                </Count>
              </Label>
            </TabSection>
          ),
          isShow: true,
          query: {
            with_tabs: 1,
            page: 1,
            pageSize: 20,
            stage: value?.value,
          },
        },
      ];
    }
  }

  return useMemo(
    () => tabs,
    [isLoading, isCandidateStatus, counts, initialData]
  );
};

export default Tabs;
