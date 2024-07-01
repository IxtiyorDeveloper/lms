import React from "react";
import Table from "./components/table";
import { WaitingListFilterWrapper } from "./components/filter/style";
import FilterComponent from "./components/filter";
import { PodoCount } from "app/statistics/podo/home/style";
import { useRouter } from "next/router";
import { useAbsentStudents, usePageDataMemo } from "hooks";
import { expand } from "./components/table/expand";
import {
  Button,
  FilledSmsSvg,
  labelOptions,
  RedBadgeTitle,
  PodoSvg,
} from "components";
import { Flex, Wrapper } from "./style";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { bgColors, textColors } from "styles/theme";
import { toggleModal } from "store";
import { CheckPermission } from "utils/guard";
import { useDispatch } from "react-redux";
import { useUserLabelSelect } from "utils/functions/userLabelSelect";
import LabelAddModal from "globals/components/labelAddAll";
import { queryKeys } from "constants/queryKeys";
import { CallSvg } from "@jasurbekyuldashov/lms-web-icons";
import Statustics from "./components/statistics";

const AbsentStudents = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { page, pageSize, ...rest } = router.query;
  const consecutive = (rest.consecutive ?? false).toString();

  const { activeStudentLabels } = usePageDataMemo();
  const filters = useUserLabelSelect(
    labelOptions.filter((option) =>
      activeStudentLabels.some((label) => label.value == option.value)
    )
  );

  const { isLoading, isPreviousData, data } = useAbsentStudents({
    query_params: {
      expand: expand,
      page: page,
      pageSize: pageSize,
    },
    body: {
      ...rest,
      ...filters,
      mentor_type: undefined,
      consecutive: JSON.parse(consecutive) ? 1 : 0,
    },
  });

  return (
    <div>
      <LabelAddModal />
      <WaitingListFilterWrapper>
        <FilterComponent />
      </WaitingListFilterWrapper>
      <Statustics activeStudentLabels={activeStudentLabels} />
      <Wrapper>
        <PodoCount>
          <RedBadgeTitle
            title="Absent students"
            count={data?.meta?.totalCount}
          />
          <Flex>
            <Button
              className="btn"
              onClick={() => {
                dispatch(
                  toggleModal({
                    key: "labelAddAll",
                    data: {
                      data: {
                        count: data?.meta?.totalCount,
                        queryKeys: [
                          queryKeys.admin_grouped_group_contact_absent_student,
                        ],
                      },
                      open: true,
                    },
                  })
                );
              }}>
              <PodoSvg width={18} color={bgColors.black} />
              &nbsp;<span>Set podo</span>
            </Button>
            <CheckPermission permission={[COMPONENTS_VIEWS.can_send_sms]}>
              <Button
                icon={<FilledSmsSvg />}
                style={{
                  padding: "0 24px",
                  color: textColors.blueGray,
                  fontWeight: 700,
                  borderRadius: 10,
                  lineHeight: "20px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
                onClick={() => {
                  dispatch(
                    toggleModal({
                      key: "groupSms",
                      data: {
                        data: {
                          filter: "absent",
                          search: router.query,
                        },
                        open: true,
                      },
                    })
                  );
                }}
              />
            </CheckPermission>
            <CheckPermission permission={[COMPONENTS_VIEWS.can_call_user]}>
              <Button
                icon={<CallSvg width={20} height={20} color={bgColors.white} />}
                style={{
                  backgroundColor: bgColors.midori,
                }}
                onClick={() => {
                  dispatch(
                    toggleModal({
                      key: "autoCall",
                      data: {
                        data: {
                          filter: "absent",
                          search: router.query,
                        },
                        open: true,
                      },
                    })
                  );
                }}
              />
            </CheckPermission>
          </Flex>
        </PodoCount>
        <Table isLoading={isLoading || isPreviousData} data={data} />
      </Wrapper>
    </div>
  );
};

export default AbsentStudents;
