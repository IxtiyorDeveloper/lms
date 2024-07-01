import { RoundedTab } from "components";
import React, { useMemo } from "react";
import { bgColors, textColors } from "styles/theme";
import { HexToRgbA } from "utils/hexToRgba";
import { Content, Leads, Wrapper } from "./style";
import { useLeadLists, useLeadTabs } from "hooks";
import LeadTabContent from "./tab";
import { LeadSourceTypes, LeadTabEnums } from "constants/leadTabs";
import { useRouter } from "next/router";
import { ILead } from "types";
import dayjs from "dayjs";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { IStyles } from "components/common/roundedTab/type";
import LeadLifeCycleModal from "globals/components/leadLifeCycle";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { funcCheckPermission } from "utils";
import { COMPONENTS_VIEWS } from "constants/permissions";

const allStyles: IStyles = {
  bgColor: bgColors.hat,
  boxShadow: "0 2px 20px rgba(0, 0, 0, 0.2)",
};

const LeadTabs = ({ selects }: { selects: any }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const query = router.query;
  const { isLoading, data } = useLeadTabs({
    search: router.query?.search,
    start_date: router.query?.start_date,
    updated_by: router.query?.updated_by,
    lead_action_type: router.query?.lead_action_type,
    end_date: router.query?.end_date,
    finish_date: router.query?.finish_date,
  });

  const today = dayjs();
  const startOfMonth = dayjs().startOf("month");

  const is_community_manager = funcCheckPermission([
    COMPONENTS_VIEWS.can_only_use_source_community_manager,
  ]);

  const source = selects?.leadSourceSelect?.find(
    (i: any) => i.type == LeadSourceTypes.COMMUNITY_MANAGER
  )?.value;

  const {
    isLoading: isLeadListLoading,
    isPreviousData,
    data: leads,
  } = useLeadLists({
    enabled: true,
    query_params: {
      start_date: startOfMonth.format(DATE_FORMAT_YYYY_MM_DD),
      end_date: today.format(DATE_FORMAT_YYYY_MM_DD),
      ...(is_community_manager ? { source_id: source } : {}),
      ...query,
    },
  });

  const extraTabs = useMemo(() => {
    return isLoading
      ? []
      : !data
        ? []
        : data
            .filter((e: any) => !e.deleted_at)
            .map((tab: ILead) => {
              const count = leads?.tab_totals?.find(
                (t) => t?.id?.toString() === tab?.id?.toString()
              )?.count;
              return {
                title: (isActive: boolean) => (
                  <Leads
                    style={{
                      backgroundColor: isActive
                        ? tab.color || bgColors.primary
                        : HexToRgbA(tab.color || bgColors.primary, 0.7),
                      color: textColors.blueGray,
                    }}>
                    {tab.name}{" "}
                    {count ? <span>({count})</span> : <span>(0)</span>}
                  </Leads>
                ),
                children: (
                  <LeadTabContent
                    tableType={LeadTabEnums.PROCESSING_LEADS}
                    leads={leads}
                    isLoading={isLeadListLoading || isPreviousData}
                    isCreatedTabs
                  />
                ),
                query: {
                  page: 1,
                  pageSize: 20,
                  tab_id: tab.id,
                },
                isHaveDelete: funcCheckPermission([
                  COMPONENTS_VIEWS.can_delete_lead_tab,
                ]),
                isHaveUpdate: funcCheckPermission([
                  COMPONENTS_VIEWS.can_manage_lead_tab,
                ]),
                onPressDelete: () => {
                  dispatch(
                    toggleModal({
                      key: "deleteLeadTab",
                      data: {
                        data: {
                          id: tab?.id,
                        },
                        open: true,
                      },
                    })
                  );
                },
                onPressUpdate: () => {
                  dispatch(
                    toggleModal({
                      key: "addLeadTab",
                      data: {
                        data: {
                          id: tab?.id,
                          type: "update",
                          data: tab,
                        },
                        open: true,
                      },
                    })
                  );
                },
              };
            });
  }, [data, isLoading, isLeadListLoading, isPreviousData, leads?.list]);

  const tabs = [
    {
      title: (isActive: boolean) => (
        <Leads
          style={{
            backgroundColor: isActive
              ? bgColors.primary
              : HexToRgbA(bgColors.primary, 0.7),
            color: textColors.blueGray,
          }}>
          New Leads{" "}
          {leads?.totals?.[LeadTabEnums.NEW_LEADS] && (
            <span>({leads?.totals?.[LeadTabEnums.NEW_LEADS]})</span>
          )}
        </Leads>
      ),
      children: (
        <LeadTabContent
          tableType={LeadTabEnums.NEW_LEADS}
          leads={leads}
          isLoading={isLeadListLoading || isPreviousData}
        />
      ),
      query: {
        status: 200,
        page: 1,
        pageSize: 100,
        tab_id: undefined,
      },
    },
    {
      title: (isActive: boolean) => {
        return (
          <Leads
            style={{
              backgroundColor: isActive
                ? bgColors.deep
                : HexToRgbA(bgColors.deep, 0.7),
              color: textColors.brilliance,
            }}>
            Processing{" "}
            {leads?.totals?.[LeadTabEnums.PROCESSING_LEADS] && (
              <span>({leads?.totals?.[LeadTabEnums.PROCESSING_LEADS]})</span>
            )}
          </Leads>
        );
      },
      children: (
        <LeadTabContent
          tableType={LeadTabEnums.PROCESSING_LEADS}
          leads={leads}
          isLoading={isLeadListLoading || isPreviousData}
        />
      ),
      query: {
        status: 300,
        pageSize: 100,
        tab_id: undefined,
      },
    },
    ...extraTabs,
    {
      title: (isActive: boolean) => {
        return (
          <Leads
            style={{
              backgroundColor: isActive
                ? bgColors.secondary
                : HexToRgbA(bgColors.secondary, 0.7),
              color: textColors.brilliance,
            }}>
            Registered{" "}
            {leads?.totals?.[LeadTabEnums.REGISTERED_LEADS] && (
              <span>({leads?.totals?.[LeadTabEnums.REGISTERED_LEADS]})</span>
            )}
          </Leads>
        );
      },
      children: (
        <LeadTabContent
          tableType={LeadTabEnums.REGISTERED_LEADS}
          leads={leads}
          isLoading={isLeadListLoading || isPreviousData}
        />
      ),
      query: {
        page: 1,
        pageSize: 100,
        status: 400,
        tab_id: undefined,
      },
    },
    {
      title: (isActive: boolean) => {
        return (
          <Leads
            style={{
              backgroundColor: isActive
                ? bgColors.pop
                : HexToRgbA(bgColors.pop, 0.7),
              color: textColors.brilliance,
            }}>
            Deleted{" "}
            {leads?.totals?.[LeadTabEnums.DELETED_LEADS] && (
              <span>({leads?.totals?.[LeadTabEnums.DELETED_LEADS]})</span>
            )}
          </Leads>
        );
      },
      children: (
        <LeadTabContent
          tableType={LeadTabEnums.DELETED_LEADS}
          leads={leads}
          isLoading={isLeadListLoading || isPreviousData}
        />
      ),
      query: {
        page: 1,
        pageSize: 100,
        status: 100,
        tab_id: undefined,
      },
    },
  ];

  return (
    <Wrapper>
      <Content>
        <RoundedTab
          tabs={tabs}
          containerStyle={{ backgroundColor: bgColors.hat }}
          allStyles={allStyles}
          isAdd={funcCheckPermission([COMPONENTS_VIEWS.can_manage_lead_tab])}
          handleClick={() =>
            dispatch(
              toggleModal({
                key: "addLeadTab",
                data: {
                  data: {
                    id: null,
                    type: "add",
                    data: null,
                  },
                  open: true,
                },
              })
            )
          }
        />
      </Content>

      <LeadLifeCycleModal />
    </Wrapper>
  );
};

export default LeadTabs;
