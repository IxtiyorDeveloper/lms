import React from "react";
import {
  MailSvg,
  RedBadgeTitle,
  AntdTable,
  labelOptions,
  Button,
  FilesSvg,
} from "components";
import { Box } from "@mui/material";
import { bgColors, textColors } from "styles/theme";
import { Columns } from "./components/table/columns";
import { usePageDataMemo, usePodoList } from "hooks";
import { expand } from "./expand";
import { useRouter } from "next/router";
import { WaitingListFilterWrapper } from "./components/filter/style";
import FilterComponent from "./components/filter";
import { PodoCount, Wrapper, ButtonWrapper } from "./style";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { useUserLabelSelect } from "utils/functions/userLabelSelect";
import { CheckPermission } from "utils";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { CallSvg } from "@jasurbekyuldashov/lms-web-icons";

const PodoList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { activeStudentLabels } = usePageDataMemo();
  const filters = useUserLabelSelect(
    labelOptions.filter((option) =>
      activeStudentLabels.some((label) => label.value == option.value)
    )
  );
  const { data, isLoading, isPreviousData } = usePodoList({
    query_params: {
      page: router.query.page,
      pageSize: router.query.pageSize,
      expand,
      sort: "time",
    },
    body: {
      ...router.query,
      ...filters,
    },
  });
  const handleOpenModal = () => {
    router.push("/statistics/podo/podo-request");
  };

  return (
    <div>
      <WaitingListFilterWrapper>
        <FilterComponent />
      </WaitingListFilterWrapper>
      <Box
        mx="40px"
        mt="20px"
        overflow="hidden"
        bgcolor={bgColors.whiteSmoke}
        borderRadius="12px"
        boxShadow="0 40px 64px -12px rgba(0, 0, 0, 0.08), 0 0 14px -4px rgba(0, 0, 0, 0.05), 0 32px 48px -8px rgba(0, 0, 0, 0.1);"
      >
        <Wrapper>
          <PodoCount>
            <div className="badge">
              <RedBadgeTitle
                title="Podo Students"
                count={data?.meta?.totalCount}
              />
            </div>
            <ButtonWrapper>
              <CheckPermission
                permission={[COMPONENTS_VIEWS.can_see_podo_requests]}
              >
                <Button
                  onClick={handleOpenModal}
                  bgColor={bgColors.deep}
                  textColor={textColors.white}
                >
                  PODO request
                </Button>
              </CheckPermission>
              <CheckPermission
                permission={[COMPONENTS_VIEWS.can_export_phone_list]}
              >
                <Button
                  icon={
                    <FilesSvg width={20} height={20} color={bgColors.black} />
                  }
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
                        key: "redListDownload",
                        data: {
                          data: {
                            filter: "podo",
                            search: router.query,
                          },
                          open: true,
                        },
                      })
                    );
                  }}
                />
              </CheckPermission>
              <Button
                className="item"
                onClick={() => {
                  dispatch(
                    toggleModal({
                      key: "groupSms",
                      data: {
                        data: {
                          filter: "podo",
                        },
                        open: true,
                      },
                    })
                  );
                }}
              >
                <MailSvg />
              </Button>
              <CheckPermission permission={[COMPONENTS_VIEWS.can_call_user]}>
                <Button
                  icon={
                    <CallSvg width={20} height={20} color={bgColors.white} />
                  }
                  style={{
                    backgroundColor: bgColors.midori,
                  }}
                  onClick={() => {
                    dispatch(
                      toggleModal({
                        key: "autoCall",
                        data: {
                          data: {
                            filter: "podo",
                            search: { ...router.query },
                          },
                          open: true,
                        },
                      })
                    );
                  }}
                />
              </CheckPermission>
            </ButtonWrapper>
          </PodoCount>
          <AntdTable
            columns={Columns()}
            dataSource={data?.list || []}
            loading={isLoading || isPreviousData}
            pagination={{
              current: data?.meta?.currentPage,
              total: data?.meta?.totalCount,
            }}
          />
        </Wrapper>
      </Box>
    </div>
  );
};

export default PodoList;
