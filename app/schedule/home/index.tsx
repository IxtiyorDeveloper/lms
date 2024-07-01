import React, { useEffect, useMemo } from "react";
import { AddStudent, TableWrapper, Wrapper } from "./style";
import { TopContent, PGWrapper, PotentialContainer } from "./style";
import { Segmented, DefaultTab, MySelect, AddStudentSvg } from "components";
import { useGroupPage, usePageDataMemo, useScheduleData } from "hooks";
import { useRouter } from "next/router";
import { DefaultTabMenu, ScheduleTable } from "./components";
import { GroupModal } from "globals/components";
import { CheckPermission, funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import BranchTabs from "./components/branchTabs";
import Actions from "./components/defaultTabMenu/actions";
import { useForm } from "react-hook-form";
import { EDayConstants } from "../constants";
import { expand } from "./expand";
import { getObjectByWeekday } from "./components/utils";
import Link from "next/link";
import { calculateFreePlace } from "./components/utils/calculateFreePlace";
import { IGroup } from "types";
import PotentialGroups from "./components/potentialGroups";

const Schedule = () => {
  const router = useRouter();
  const { control, watch, setValue } = useForm();
  const selects = usePageDataMemo();

  const branchId = router?.query?.branch_id;

  const exclude_next_month_free_place =
    router.query?.exclude_next_month_free_place;

  const free_place_with_active_students =
    router.query?.free_place_with_active_students;

  const {
    data: initialData,
    isLoading,
    isPreviousData: isInitialPreviousData,
  } = useGroupPage({
    query_params: {
      expand,
      course_id: router?.query?.course_id,
      date: router.query?.active_students_date,
    },
  });

  const {
    data: scheduleData,
    isPreviousData,
    isInitialLoading,
  } = useScheduleData({
    query_params: {
      branch_id: router?.query?.branch_id,
      course_id: router?.query?.course_id,
      date: router.query?.active_students_date,
    },
  });

  const branches = initialData?.branches;
  const data = initialData;

  const isShowFreePlace = funcCheckPermission([
    COMPONENTS_VIEWS.can_see_free_place_of_group,
  ]);

  const currentBranch =
    router.query.branch_id?.toString() || initialData?.default_branch || 0;

  const currentDefaultTab = router.query.defaultTabMenu?.toString() || "0";

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change" && name === "course_id") {
        router.replace({
          pathname: router.pathname,
          query: { ...router.query, course_id: value["course_id"] },
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, router.query?.course_id]);

  useEffect(() => {
    if (selects.course) {
      setValue("course_id", router.query.course_id ?? selects.course[0]?.value);
    }
  }, [selects.args.isLoading, selects.args.isPreviousData]);

  const objectByWeekday = getObjectByWeekday({
    data: data?.days || initialData?.days,
  });

  const day_id =
    router.query?.day_id?.toString() || objectByWeekday?.id?.toString();

  const days = useMemo(() => {
    if (
      router.query.defaultTabMenu == "1" &&
      router.query.freePlaceType == "2"
    ) {
      return [data?.days?.[0]];
    } else {
      if (day_id == EDayConstants.ALL) {
        return data?.days;
      } else {
        if (!!day_id) {
          return data?.days?.filter((d) => d.id.toString() == day_id);
        } else {
          const objectByWeekday = getObjectByWeekday({
            data: data?.days,
          });
          if (objectByWeekday) return [objectByWeekday];
          else return [data?.days?.[0]];
        }
      }
    }
  }, [
    day_id,
    data?.days,
    router.query.defaultTabMenu,
    router.query.freePlaceType,
  ]);

  function addCustomFreePlace({ data }: { data: IGroup[] | undefined }) {
    let a: any = [];
    if (data) {
      for (let i = 0; i < data?.length; i++) {
        const current = data?.[i];
        if (free_place_with_active_students) {
          a = [
            ...a,
            {
              ...current,
              custom_free_place: current?.free_place_with_active_students,
            },
          ];
        } else {
          if (exclude_next_month_free_place) {
            a = [
              ...a,
              {
                ...current,
                custom_free_place: current?.free_place,
              },
            ];
          } else {
            a = [
              ...a,
              {
                ...current,
                custom_free_place: current?.free_place_with_next_month,
              },
            ];
          }
        }
      }
    }
    return a;
  }

  const collection = useMemo(() => {
    return branchId
      ? {
          groups: addCustomFreePlace({ data: scheduleData?.data }),
          rooms: scheduleData?.rooms,
          teachers: scheduleData?.teachers,
        }
      : {
          groups: addCustomFreePlace({ data: initialData?.data }),
          rooms: initialData?.rooms,
          teachers: initialData?.teachers,
        };
  }, [
    branchId,
    scheduleData,
    initialData,
    free_place_with_active_students,
    exclude_next_month_free_place,
  ]);

  const freePlaceCount = useMemo(() => {
    return calculateFreePlace({
      collection,
      router,
      day_id,
    });
  }, [collection, router, day_id]);

  return (
    <Wrapper>
      {funcCheckPermission([COMPONENTS_VIEWS.can_create_user]) && (
        <AddStudent>
          <Link href="/student/create-student">
            <AddStudentSvg width={27} height={24} />
          </Link>
        </AddStudent>
      )}
      <GroupModal />
      <TopContent>
        <div className="mainTab">
          {(selects?.course?.length || 0) > 1 && (
            <div className="select-wrapper">
              <div className="select-flex-end">
                <MySelect
                  className="select"
                  control={control}
                  name="course_id"
                  placeholder="Course"
                  options={selects.course}
                  allowClear={false}
                />
              </div>
            </div>
          )}
          <div className="branchTabs">
            <Segmented
              options={BranchTabs({ branches, currentBranch })}
              initValue={currentBranch}
              routerKey="branch_id"
            />
          </div>
          <DefaultTab
            initValue={currentDefaultTab}
            items={DefaultTabMenu({
              isShowFreePlace,
              currentDefaultTab,
              freePlaceCount,
              collection,
              day_id,
            })}
            routerKey="defaultTabMenu"
            action={Actions({ isShowFreePlace, data, initialData })}
          />
        </div>
      </TopContent>
      <TableWrapper>
        {days?.map((d, index) => {
          return (
            <div className="sch-table" key={index}>
              {days?.length > 1 && <p className="day-name">{d?.name}</p>}
              <div
                className={`main-table ${days?.length > 1 ? "padding" : ""}`}
              >
                <ScheduleTable
                  data={data}
                  collection={collection}
                  initValue={currentBranch}
                  day_id={d?.id?.toString()}
                  isLoading={
                    isLoading ||
                    isInitialLoading ||
                    isInitialPreviousData ||
                    isPreviousData ||
                    selects.args.isLoading ||
                    selects.args.isPreviousData
                  }
                />
              </div>
            </div>
          );
        })}
      </TableWrapper>
      <CheckPermission
        permission={[COMPONENTS_VIEWS.can_view_potential_groups]}
      >
        <PGWrapper>
          {days?.map((d, index) => {
            return (
              <PotentialContainer>
                {days?.length > 1 && <p className="day-name">{d?.name}</p>}
                <PotentialGroups
                  data={data}
                  day_id={d?.id?.toString()}
                  key={index}
                  potentialGroups={
                    branchId
                      ? scheduleData?.potentialGroups
                      : data?.potentialGroups
                  }
                  initValue={currentBranch}
                  isLoading={
                    isLoading ||
                    isInitialLoading ||
                    isInitialPreviousData ||
                    isPreviousData ||
                    selects.args.isLoading ||
                    selects.args.isPreviousData
                  }
                />
              </PotentialContainer>
            );
          })}
        </PGWrapper>
      </CheckPermission>
    </Wrapper>
  );
};

export default React.memo(Schedule);
