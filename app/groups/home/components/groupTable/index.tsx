import React, { FC } from "react";
import { Flex, Wrapper } from "./style";
import { Button, FilledSmsSvg, PlusSvg, AntdTable } from "components";
import { textColors } from "styles/theme";
import Column from "./column";
import { useRouter } from "next/router";
import { Interface } from "./type";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { CheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { tableCols } from "./options";
import { STATE_OPENING } from "constants/groupStatus";
import { IGroup } from "types";
import { queryKeys } from "constants/queryKeys";

const GroupTable: FC<Interface> = ({ data, isLoading }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleCreateGroup = () =>
    dispatch(
      toggleModal({
        key: "group",
        data: {
          open: true,
          data: {
            id: router?.query?.id,
            action: "create",
            queryKeys: [queryKeys.admin_group_index],
          },
        },
      })
    );

  return (
    <Wrapper>
      <Flex>
        <CheckPermission permission={[COMPONENTS_VIEWS.can_create_group]}>
          <Button
            icon={<PlusSvg />}
            style={{
              padding: "0 24px",
              color: textColors.blueGray,
              fontWeight: 700,
              borderRadius: 10,
              lineHeight: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
            onClick={handleCreateGroup}
          >
            Create Group
          </Button>
        </CheckPermission>
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
                    filter: "group",
                  },
                  open: true,
                },
              })
            );
          }}
        />
      </Flex>
      <AntdTable
        loading={isLoading}
        columns={Column({
          activeColumns:
            tableCols[
              (router.query.tab_id || STATE_OPENING) as keyof typeof tableCols
            ],
        })}
        dataSource={data?.data?.list ?? []}
        pagination={{
          current: data?.data?.meta?.currentPage,
          total: data?.data?.meta?.totalCount,
        }}
        rowClassName={(record: IGroup, index, indent) => {
          if (router.query.roundedTabIndex == "1") {
            return +record?.payment_count >= +record?.groupType?.max_count
              ? "colored-row"
              : "";
          } else return "";
        }}
      />
    </Wrapper>
  );
};

export default GroupTable;
