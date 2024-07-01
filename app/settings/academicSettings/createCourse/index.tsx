import React from "react";
import { Edit, GroupType, Wrapper, TopContent, Text } from "./style";
import { AntdSwitch, AntdTable, Button, EditSvg, PlusSvg } from "components";
import { bgColors } from "styles/theme";
import { StyledTable, PriceList } from "./components";
import { useForm } from "react-hook-form";
import { useCourse, usePageDataMemo } from "hooks";
import groupTypeColumns from "./components/groupTypeColumns";
import levelColumns from "./components/levelColumns";
import dayColumns from "./components/dayColumns";
import { SwitchWrapper } from "../leavingCategories/components/table/style";
import {
  DeleteGroupType,
  GroupTypeModal,
  LevelModal,
  DeleteLevel,
  DayModal,
  DeleteLessonDay,
} from "globals/components";
import { useDispatch } from "react-redux";
import { toggleModal } from "store";
import { Spin } from "antd";
import { CourseModal } from "../components";
import { useRouter } from "next/router";

const CreateCourse = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { control: enableControl, watch: enableWatch } = useForm();
  const id = router?.query?.update_id;
  const {
    staffEnumsGroupForms,
    args: { isLoading: isPageDataLoading },
  } = usePageDataMemo();

  const {
    data: course,
    isLoading,
    isPreviousData,
  } = useCourse({
    query_params: {
      id: id,
      expand:
        "coursePrices,lessonTimes,lessonDays.lessonWeeks,parentLevels.children,groupTypes",
    },
  });

  return (
    <Wrapper>
      <Spin spinning={isLoading || isPreviousData || isPageDataLoading}>
        <CourseModal />
        <DeleteLessonDay />
        <DeleteGroupType />
        <DeleteLevel />
        <GroupTypeModal />
        <LevelModal />
        <DayModal />
        <Edit>
          <p>{course?.name}</p>
          <div
            className="abs"
            onClick={() =>
              dispatch(
                toggleModal({
                  key: "createCourse",
                  data: {
                    data: {
                      type: "update",
                    },
                    open: true,
                  },
                })
              )
            }
          >
            <EditSvg color={bgColors.midori} />
          </div>
        </Edit>
        <GroupType>
          <TopContent>
            <div className="text">Group Type</div>
            <div className="button">
              <Button
                icon={<PlusSvg />}
                style={{
                  padding: "0 24px",
                  fontWeight: 700,
                  borderRadius: 10,
                }}
                onClick={() =>
                  dispatch(
                    toggleModal({
                      key: "groupTypeModal",
                      data: {
                        data: {
                          type: "create",
                        },
                        open: true,
                      },
                    })
                  )
                }
              >
                Add
              </Button>
            </div>
          </TopContent>
          <AntdTable
            dataSource={course?.groupTypes}
            loading={isLoading || isPreviousData}
            columns={groupTypeColumns({ groupForms: staffEnumsGroupForms })}
          />
        </GroupType>
        <GroupType>
          <TopContent>
            <div className="text">Levels</div>
            <div className="button">
              <form>
                <SwitchWrapper>
                  <AntdSwitch
                    name="enable"
                    control={enableControl}
                    label="Enable reorder"
                    widthSwitch={20}
                    style={{
                      flexDirection: "row",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  />
                </SwitchWrapper>
              </form>
              <Button
                icon={<PlusSvg />}
                style={{
                  padding: "0 24px",
                  fontWeight: 700,
                  borderRadius: 10,
                }}
                onClick={() =>
                  dispatch(
                    toggleModal({
                      key: "levelModal",
                      data: {
                        data: {
                          type: "create",
                        },
                        open: true,
                      },
                    })
                  )
                }
              >
                Add
              </Button>
            </div>
          </TopContent>
          <StyledTable
            columnWidths={
              <colgroup>
                <col style={{ width: `20%` }} />
                <col style={{ width: `50%` }} />
                <col style={{ width: `20%` }} />
                <col style={{ width: `10%` }} />
              </colgroup>
            }
            data={course?.parentLevels}
            isLoading={isLoading || isPreviousData || isPageDataLoading}
            isDisabled={!enableWatch("enable")}
            columns={levelColumns()}
          />
        </GroupType>
        <GroupType>
          <TopContent>
            <div className="text">Days</div>
            <div className="button">
              <Button
                icon={<PlusSvg />}
                style={{
                  padding: "0 24px",
                  fontWeight: 700,
                  borderRadius: 10,
                }}
                onClick={() =>
                  dispatch(
                    toggleModal({
                      key: "dayModal",
                      data: {
                        data: {
                          type: "create",
                        },
                        open: true,
                      },
                    })
                  )
                }
              >
                Add
              </Button>
            </div>
          </TopContent>
          <AntdTable
            dataSource={course?.lessonDays}
            loading={isLoading || isPreviousData}
            columns={dayColumns()}
          />
        </GroupType>
        <Text>Price List</Text>
        <PriceList />
      </Spin>
    </Wrapper>
  );
};

export default CreateCourse;
