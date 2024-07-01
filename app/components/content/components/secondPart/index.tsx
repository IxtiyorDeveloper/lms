import React from "react";
import {
  AddToGroupWarning,
  AntdRate,
  AntdTable,
  BalanceWithDebt,
  BranchTag,
  Calendar,
  CardImage,
  CircleImageBlackRedList,
  CircleSegment,
  ClickableTag,
  Collapse,
  DefaultTab,
  Filters,
  FloatButton,
  GroupInsideHeaderInfo,
  HasMoneyOperation,
  HorizontalBar,
  MyPagination,
  NextLink,
  ObservationStudents,
  PersonComment,
  Quill,
  RedBadgeTitle,
  TaskId,
  TaskLinks,
  TreeSelect,
  UploadFile,
  WarningComponent,
} from "components";
import { usePageDataMemo } from "hooks";
import { useForm } from "react-hook-form";
import { circle_options, Columns, options } from "./data";
import StudentSearchLabel from "./components/studentSearchLabel";
import ProductList from "./components/productList";
import RunningType from "./components/runningType";
import GroupInterface from "./components/groupInterface";
import StudentCard from "./components/studentCard";
import { HashSvg } from "components";
import DetailedStudentCard from "./components/detailedStudentCard";
import AntdUserProfile from "./components/antdUserProfile";
import ArchiveAttendance from "./components/archiveAttendance";
import ExpenseFiles from "./components/expenseFiles";
import CandidateProfile from "./components/candidateProfile";
import { ETaskState } from "types";
import SupportCardInfo from "./components/supportCardInfo";
import AbsMergedWithUnit from "./components/absMergedWithUnit";
import {
  Circle,
  GroupsTitle,
  Text,
} from "../../../../finance/salary/home/components/secondSite/components/departmentDraw/table/components/columns/components/fullSalary/components/definition/components/tabs/style";
import { ChevronDownSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "../../../../../styles/theme";
import TeacherGroups from "../../../../finance/salary/home/components/secondSite/components/departmentDraw/table/components/columns/components/fullSalary/components/definition/components/tabs/components/teacherGroups";

const RenderSecondComponents = () => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const methods = useForm();
  const selects = usePageDataMemo();

  return {
    StudentSearchLabel: <StudentSearchLabel />,
    CardImage: <CardImage />,
    ProductList: <ProductList />,
    UploadFile: (
      <UploadFile control={control} name="UploadFile" setValue={setValue} />
    ),
    TreeSelect: <TreeSelect control={control} name="TreeSelect" />,
    RunningType: <RunningType />,
    NextLink: <NextLink href="/">NextLink</NextLink>,
    Calendar: <Calendar control={control} name="Calendar" />,
    CircleSegment: <CircleSegment options={circle_options} />,
    DefaultTab: <DefaultTab items={options} />,
    GroupInterface: <GroupInterface />,
    StudentCard: <StudentCard />,
    Filters: (
      <Filters
        activeElements={[
          {
            name: "lesson_day_id",
            elementType: "select",
            label: "Day",
            options: "days",
            args: {
              maxTagCount: 1,
              mode: "multiple",
            },
          },
        ]}
        methods={methods}
        useExcludeArguments={{
          array: ["pageSize", "page"],
          isClearChange: [
            { watchField: "parent_level_id", clearField: "level_id" },
          ],
        }}
      />
    ),
    ClickableTag: (
      <ClickableTag
        control={control}
        name="ClickableTag"
        data={[
          {
            id: 0,
            name: (
              <div className="tag-item">
                <HashSvg width={16} height={16} />
                <p>One</p>
              </div>
            ),
          },
          {
            id: 2,
            name: (
              <div className="tag-item">
                <HashSvg width={16} height={16} />
                <p>Next</p>
              </div>
            ),
          },
        ]}
      />
    ),
    RedBadgeTitle: <RedBadgeTitle />,
    BalanceWithDebt: <BalanceWithDebt />,
    DetailedStudentCard: <DetailedStudentCard />,
    AbsMergedWithUnit: <AbsMergedWithUnit />,
    PersonComment: <PersonComment />,
    AntdTable: <AntdTable columns={Columns()} dataSource={[{ some: 1 }]} />,
    CircleImageBlackRedList: <CircleImageBlackRedList />,
    HasMoneyOperation: (
      <HasMoneyOperation control={control} name="HasMoneyOperation" />
    ),
    AntdUserProfile: <AntdUserProfile />,
    AddToGroupWarning: <AddToGroupWarning />,
    WarningComponent: <WarningComponent text="Warning" />,
    MyPagination: (
      <MyPagination current={12} total={2000} pageCount={1} pageSize={20} />
    ),
    LabelSlotHoveredMonth: "Unused",
    ArchiveAttendance: <ArchiveAttendance />,
    ExpenseFiles: <ExpenseFiles />,
    Collapse: (
      <Collapse
        items={[
          {
            key: "1",
            label: <p>Collapse</p>,
            showArrow: false,
            children: <div>Child data</div>,
          },
        ]}
      />
    ),
    Quill: <Quill control={control} name="Quill" />,
    CandidateProfile: <CandidateProfile />,
    TaskId: <TaskId state={ETaskState.ON_PROCESS} color="green" id={1} />,
    GroupInsideHeaderInfo: <GroupInsideHeaderInfo />,
    AntdRate: <AntdRate name="AntdRate" control={control} />,
    TaskLinks: (
      <TaskLinks
        value={[
          {
            id: 262,
            model_type: 8500,
            model_id: 18482,
          },
        ]}
      />
    ),
    HorizontalBar: (
      <HorizontalBar
        data={[
          {
            percentage: 25,
            color: "red",
            label: "Label",
          },
          {
            percentage: 75,
            color: "green",
            label: "Label",
          },
        ]}
      />
    ),
    FloatButton: <FloatButton />,
    BranchTag: (
      <BranchTag branches={selects.branch?.map((item) => item.value) as any} />
    ),
    SupportCardInfo: <SupportCardInfo />,
    ObservationStudents: <ObservationStudents />,
  };
};

export default RenderSecondComponents;
