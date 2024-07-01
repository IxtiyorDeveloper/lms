import React, { useMemo, useState } from "react";
import {
  AdministrativeSvg,
  AcademicSvg,
  ComplexThinTab,
  MainHeadWithTitle,
  CalendarAmazonSvg,
  CreateNoteSvg,
  Button,
  AddStudentSvg,
  FilledSmsSvg,
  PrintSvg,
  GroupInsideHeaderInfo,
} from "components";

import AttendanceTabItem from "./components/attendanceTab";
import { useGroup, usePageDataMemo } from "hooks";
import Router, { useRouter } from "next/router";
import { expand } from "./expand";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import {
  GroupInsideTableCard,
  GroupInsideTableWrapper,
  GroupNote,
  GroupNoteTitle,
  LeftWrapper,
  Wrapper,
} from "./style";
import { GroupNoteModal } from "globals/components";
import { CheckPermission, funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { IGroup } from "types";
import { bgColors, textColors } from "styles/theme";
import moment from "moment/moment";
import { DATE_FORMAT_DD_MM_YYYY } from "constants/dates";
import { Popover, Spin } from "antd";
import Link from "next/link";
import _ from "lodash";
import AdministrativeTable from "./components/administrativeTab";
import { CallSvg, NoteDeleteSvg } from "@jasurbekyuldashov/lms-web-icons";
import { getNextLevel } from "./components/utils/getNextLevel";
import DeleteStudentsNote from "globals/components/deleteStudentsNote";

const GroupSinglePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [noteOpen, setNoteOpen] = useState(false);
  const { flatLevels } = usePageDataMemo();
  const {
    data: group,
    isInitialLoading: isLoading,
    isPreviousData,
  } = useGroup({
    id: router.query.groupId,
    expand,
  });

  const can_see_attendance_control = funcCheckPermission([
    COMPONENTS_VIEWS.can_see_group_attendance,
  ]);
  const handleNote = () => {
    if (funcCheckPermission([COMPONENTS_VIEWS.can_change_group_note])) {
      setNoteOpen(false);
      dispatch(
        toggleModal({
          key: "groupNote",
          data: {
            data: {
              group_id: group?.id,
              type: group?.note ? "update" : "create",
              group,
            },
            open: true,
          },
        }),
      );
    }
  };
  const handleOpenChange = (newValue: boolean) => {
    setNoteOpen(newValue);
  };

  const handleOpen = () => {
    dispatch(
      toggleModal({
        key: "groupStudentsList",
        data: {
          data: {
            groups: {
              ...group,
              allContacts: _.sortBy(group?.allContacts, "actualPayment.status"),
            },
          },
          open: true,
        },
      }),
    );
  };

  const handleOpenNoteDeleteOpen = () => {
    dispatch(
      toggleModal({
        key: "deleteStudentsNote",
        data: {
          data: {
            id: group?.id,
          },
          open: true,
        },
      }),
    );
  };

  const LeftChildren = ({ group }: { group: IGroup }) => {
    return (
      <LeftWrapper>
        <GroupNote>
          <div className="d-s">
            <CalendarAmazonSvg color={bgColors.yourShadow} />
          </div>
          <p>{moment(group?.start_date).format(DATE_FORMAT_DD_MM_YYYY)}</p>
        </GroupNote>
        {group?.note ? (
          <Popover
            destroyTooltipOnHide
            content={<GroupNoteTitle>{group?.note}</GroupNoteTitle>}
            placement="bottom"
            trigger="hover"
            open={noteOpen}
            onOpenChange={handleOpenChange}
          >
            <GroupNote className="pointer" onClick={() => handleNote()}>
              <div>
                <CreateNoteSvg />
              </div>
              <p className="note">{group?.note}</p>
            </GroupNote>
          </Popover>
        ) : (
          <Button
            bgColor={bgColors.wildSand}
            textColor={textColors.yourShadow}
            onClick={() => handleNote()}
          >
            <CreateNoteSvg />
            Create Note
          </Button>
        )}
        <Button onClick={handleOpen} bgColor={bgColors.whiteSmoke}>
          <PrintSvg color={bgColors.yourShadow} />
        </Button>
        <Button className="button">
          <Link
            className="link"
            href={{
              pathname: `/groups/${group?.id}/student-recommendation`,
              query: {
                course_id: group?.course?.id,
                level_id: [
                  group?.featureLevel?.id as any,
                  getNextLevel({ id: group?.featureLevel?.id, flatLevels })!,
                ],
                group_type_id: group?.group_type_id,
                day_id: group?.lesson_day_id,
                time_id: group?.lesson_time_id,
                branch_id: group?.room?.branch?.id,
              },
            }}
          >
            <Wrapper>
              <div>
                <AddStudentSvg />
              </div>
              <p className="text-n">Add student</p>
            </Wrapper>
          </Link>
        </Button>
        <CheckPermission
          permission={[COMPONENTS_VIEWS.can_clear_group_students_note]}
        >
          <Button
            style={{ backgroundColor: bgColors.pop, color: textColors.white }}
            onClick={handleOpenNoteDeleteOpen}
          >
            <Wrapper>
              <NoteDeleteSvg fill={bgColors.white} width={20} height={20} />
              <p className="text-w">Clear student’s note</p>
            </Wrapper>
          </Button>
        </CheckPermission>
        <Button
          onClick={() => {
            dispatch(
              toggleModal({
                key: "groupSms",
                data: {
                  data: {
                    filter: "contact",
                    group_id: router.query.groupId,
                  },
                  open: true,
                },
              }),
            );
          }}
        >
          <FilledSmsSvg />
        </Button>
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
                      filter: "contact",
                      group_id: router.query.groupId,
                    },
                    open: true,
                  },
                }),
              );
            }}
          />
        </CheckPermission>
      </LeftWrapper>
    );
  };
  const menu = useMemo(() => {
    if (can_see_attendance_control)
      return [
        {
          label: "Administrative",
          children: (
            <div style={{ overflowY: "auto" }}>
              <AdministrativeTable
                group={group}
                isLoading={isLoading || isPreviousData}
              />
            </div>
          ),
          icon: AdministrativeSvg,
          query: {
            mainTab: 0,
          },
          isClickable: true,
        },
        {
          label: "Academic",
          children: <AttendanceTabItem />,
          icon: AcademicSvg,
          query: {
            mainTab: 1,
          },
          isClickable: true,
        },
      ];
    else {
      return [
        {
          label: "Administrative",
          children: (
            <div style={{ overflowY: "auto" }}>
              <AdministrativeTable
                group={group}
                isLoading={isLoading || isPreviousData}
              />
            </div>
          ),
          icon: AdministrativeSvg,
          query: {
            mainTab: 0,
          },
          isClickable: true,
        },
      ];
    }
  }, [isLoading, group, can_see_attendance_control, router.query]);

  const initValue =
    menu.findIndex(
      (e) => e?.query?.mainTab?.toString() === Router?.query?.mainTab,
    ) > -1
      ? menu.findIndex(
          (e) => e?.query?.mainTab?.toString() === Router?.query?.mainTab,
        )
      : 0;

  if (group)
    return (
      <Spin spinning={isLoading || isPreviousData}>
        <GroupInsideTableWrapper>
          <GroupNoteModal />
          <DeleteStudentsNote />
          <MainHeadWithTitle title={group?.name} />
          <GroupInsideHeaderInfo group={group} />
          <GroupInsideTableCard>
            <ComplexThinTab
              isDefault={false}
              headStyle={{ padding: "0", borderRadius: 0 }}
              headPadding={20}
              menu={menu}
              initValue={initValue}
              topLeftChildren={LeftChildren({ group })}
            />
          </GroupInsideTableCard>
        </GroupInsideTableWrapper>
      </Spin>
    );
  return null;
};

export default GroupSinglePage;
