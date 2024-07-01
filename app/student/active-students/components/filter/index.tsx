import React from "react";
import { BlockSvg, Filters, labelOptions } from "components";
import { useForm } from "react-hook-form";
import { useGCPageDataMemo, usePageDataMemo } from "hooks";
import { COMPONENTS_VIEWS } from "constants/permissions";
import {
  PAYMENT_FULL_PAID,
  PAYMENT_NOT_PAID,
  PAYMENT_PARTIALLY_PAID,
} from "constants/payment";
import { FRESHMAN_NEW, FRESHMAN_OLD } from "constants/freshman";
import { Flex } from "utils/style";
import { bgColors } from "styles/theme";
import { BLOCKED_STUDENT_MOCK, LABEL_COMING } from "constants/labels";
import { checkLabelVisible } from "utils/checkLabelVisible";
import { studentRowColors } from "../../../../../constants/colors";
import { ColorContainer } from "../../../archived/components/filter/style";
import { useRouter } from "next/router";

const lessonCount = Array(12).fill(1);
const FilterComponent = () => {
  const router = useRouter();
  const methods = useForm();
  const selects = usePageDataMemo();
  const selectsGC = useGCPageDataMemo();
  const isComingVisible = checkLabelVisible({
    methods,
    labelKey: LABEL_COMING,
  });
  const isStopping = router.query?.roundedTabIndex?.toString() == "2";
  return (
    <Filters
      activeElements={[
        {
          name: "search",
          elementType: "search",
          placeholder: "Search",
          full_width: true,
        },
        {
          name: "payment_state",
          elementType: "select",
          label: "Payment",
          customOptions: [
            { label: "Full Paid", value: `${PAYMENT_FULL_PAID}` },
            {
              label: "Partially Paid",
              value: `${PAYMENT_PARTIALLY_PAID}`,
            },
            { label: "Not Paid", value: `${PAYMENT_NOT_PAID}` },
          ],
          permission: [COMPONENTS_VIEWS.can_see_student_payment],
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "lesson_day_id",
          elementType: "select",
          options: "days",
          label: "Days",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "time_id",
          elementType: "select",
          label: "Time",
          options: "time",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "branch_id",
          elementType: "select",
          label: "Branch",
          options: "branch",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "parent_level_id",
          elementType: "select",
          customOptions: selects.level.options,
          label: "Level",
        },
        {
          name: "level_id",
          elementType: "select",
          label: "Sub level",
          customOptions: selects.level?.options?.find(
            (e) => e?.value.toString() === methods.watch("parent_level_id"),
          )?.subLevel,
          args: {
            disabled: !methods.watch("parent_level_id"),
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "teacher_id",
          elementType: "select",
          label: "Teacher",
          customOptions: selectsGC.teachers,
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "support_id",
          elementType: "select",
          label: "Support",
          customOptions: selects.support,
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "group_id",
          elementType: "select",
          label: "Group name",
          customOptions: selectsGC.groupName,
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "group_type_id",
          elementType: "select",
          label: "Group type",
          options: "groupType",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "start_date",
          elementType: "rangePicker",
          label: "Start date period",
        },
        {
          name: "leaving_category_id",
          elementType: "select",
          label: "Stopping category",
          options: "stoppingCategories",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "freshman_type",
          elementType: "select",
          label: "Freshman",
          customOptions: [
            { label: "Freshman new", value: `${FRESHMAN_NEW}` },
            { label: "Freshman old", value: `${FRESHMAN_OLD}` },
          ],
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "user_label_type",
          elementType: "select",
          label: "Label",
          customOptions: [
            {
              value: BLOCKED_STUDENT_MOCK,
              label: (
                <Flex gap="10px">
                  <BlockSvg
                    width={17.37}
                    height={17.37}
                    color={bgColors.sceptreBlue}
                  />
                  <p>User blocked</p>
                </Flex>
              ),
            },
            ...(labelOptions.filter((option) =>
              selects?.activeStudentLabels.some(
                (label) => label.value == option.value,
              ),
            ) || []),
          ],
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "color",
          elementType: "select",
          label: "Color",
          isVisible: isStopping,
          customOptions: studentRowColors.map((item, index) => ({
            value: !!item.color ? item.color : item.name,
            label: (
              <ColorContainer className="container">
                {item.color ? (
                  <div
                    className="color"
                    style={{ backgroundColor: item.color }}
                  ></div>
                ) : (
                  <div
                    className="no-color"
                    style={{ backgroundColor: item.color }}
                  >
                    No color
                  </div>
                )}
              </ColorContainer>
            ),
          })),
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "lesson_counts",
          elementType: "select",
          label: "Lesson count",
          customOptions: lessonCount.map((e, index) => {
            return {
              label: <div>{index + 1}</div>,
              value: index + 1,
            };
          }),
          args: {
            mode: "multiple",
          },
        },
      ]}
      resetQueryExceptions={["page", "pageSize", "roundedTabIndex", "status"]}
      useExcludeArguments={{
        array: ["page", "pageSize", "roundedTabIndex", "status"],
        isClearChange: [
          {
            watchField: "parent_level_id",
            clearField: "level_id",
          },
        ],
      }}
      dates={[
        {
          enterFieldsName: "start_date",
          firstFieldName: "start_date_from",
          secondFieldName: "start_date_to",
        },
        {
          enterFieldsName: "label_date",
          firstFieldName: "label_from_date",
          secondFieldName: "label_to_date",
          isVisible: isComingVisible,
        },
      ]}
      deletedFields={["start_date", "label_date"]}
      methods={methods}
      selects={selects}
      dateFormatDisabled
    />
  );
};

export default FilterComponent;
