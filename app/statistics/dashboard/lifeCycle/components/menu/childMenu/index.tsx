import React, { useEffect } from "react";
import { Collapse } from "antd";
import { IDepartment } from "types/department";
import { useDepartment } from "hooks";
import {
  ChildMenuWrapper,
  PeopleWrapper,
  StyledChildrenCollapse,
} from "./style";
import { ParentHeader } from "./style";
import { ArrowSvg } from "components";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import { useRouter } from "next/router";
import _ from "lodash";

const { Panel } = Collapse;

const ChildMenu = ({ item }: { item: IDepartment }) => {
  const router = useRouter();
  const { created_by_sidebar, ...rest } = router.query;
  let created_by_sidebar_array =
    typeof created_by_sidebar === "string"
      ? [created_by_sidebar]
      : created_by_sidebar;
  const [selected, setSelected] = React.useState<string | string[]>(
    created_by_sidebar_array || []
  );

  const { data, isLoading, isPreviousData } = useDepartment({
    query_params: {
      id: item?.id,
      expand: "rbacRoles.rbacAssignments.user",
    },
  });
  const handleSelect = ({ user_id }: { user_id: string }) => {
    const is_selected = selected?.includes(user_id?.toString());
    if (!is_selected) {
      const new_selected = [...(created_by_sidebar_array || []), user_id];
      setSelected(new_selected);
      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...rest,
            created_by_sidebar: new_selected,
          },
        },
        undefined,
        {
          scroll: false,
        }
      );
    } else {
      const new_selected = [
        ...(created_by_sidebar_array?.filter(
          (item) => item?.toString() !== user_id?.toString()
        ) || []),
      ];
      setSelected(new_selected);

      router.replace({
        pathname: router.pathname,
        query: {
          ...rest,
          created_by_sidebar: new_selected,
        },
      });
    }
  };
  useEffect(() => {
    const { page, pageSize, ...rest } = router.query;
    if (_.isEmpty(rest)) {
      setSelected([]);
    }
  }, [router.query]);
  return (
    <ChildMenuWrapper>
      {isLoading || isPreviousData ? (
        <div className="skeleton">
          <Stack spacing={1}>
            {Array.from(Array(4).keys())?.map((item, key) => {
              return <Skeleton key={`skeleton_key_${key}`} />;
            })}
          </Stack>
        </div>
      ) : (
        <StyledChildrenCollapse>
          {data?.rbacRoles?.map((item) => {
            return (
              <Panel
                header={
                  <ParentHeader className="active">
                    <div>{item?.name}</div>
                    <div className="arrow">
                      <ArrowSvg />
                    </div>
                  </ParentHeader>
                }
                key={item.id}
              >
                <PeopleWrapper>
                  {item?.rbacAssignments?.map((item) => {
                    const fullName = item?.user?.userProfile?.firstname
                      ? `${item?.user?.userProfile?.firstname} ${item?.user?.userProfile?.lastname}`
                      : item?.user?.username;
                    const isActive = selected?.includes(
                      item?.user?.id?.toString()
                    );
                    return (
                      <div
                        key={item?.user?.id?.toString()}
                        className={`row ${isActive ? "active-row" : ""}`}
                        onClick={() =>
                          handleSelect({ user_id: item?.user?.id?.toString() })
                        }
                      >
                        <p>{fullName}</p>
                        {isActive && <div className="dot"></div>}
                      </div>
                    );
                  })}
                </PeopleWrapper>
              </Panel>
            );
          })}
        </StyledChildrenCollapse>
      )}
    </ChildMenuWrapper>
  );
};

export default ChildMenu;
