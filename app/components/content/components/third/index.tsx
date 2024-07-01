import React from "react";
import {
  ExpenseActions,
  GroupActions,
  HalfBorder,
  IncomeActions,
  labelOptions,
  LangWrapper,
  MarkCell,
  NoteEditPopover,
  PhoneCell,
  SortControl,
  StudentActions,
  StudentLabels,
  TabSelect,
} from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { phoneData, tabSelectData } from "./data";
import ContactActions from "./contactActions";
import PaymentInfo from "./paymentInfo";
import PeriodsCell from "./periodsCell";
import AntdInfoCell from "./antdInfoCell";
import StudentBalancePopover from "./studentBalance";

const RenderThirdComponent = () => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const methods = useForm();
  const selects = usePageDataMemo();
  const handleChange = () => {};
  return {
    SortControl: <SortControl control={control} name="name" label="Sort" />,
    TabSelect: (
      <TabSelect control={control} name="name" options={tabSelectData} />
    ),
    PhoneCell: <PhoneCell value={phoneData} />,
    NoteEditPopover: (
      <NoteEditPopover
        control={control}
        note="note"
        defaultValue="defaultValue"
        handleSubmit={handleSubmit}
        onSubmit={handleChange}
        id={1}
      />
    ),
    MarkCell: <MarkCell color="green" />,
    ContactActions: <ContactActions />,
    StudentActions: (
      <StudentActions activeActions={{ call: true, unban: true }} />
    ),
    StudentLabels: (
      <StudentLabels activeLabels={{ start_date: true, not_answered: true }} />
    ),
    PaymentInfo: <PaymentInfo />,
    PaymentInfoWithMonth: "not used",
    InfoCell: "not used",
    PeriodsCell: <PeriodsCell />,
    StyledPopover: "unused",
    GroupActions: <GroupActions activeActions={{ edit: true, take: true }} />,
    IncomeActions: (
      <IncomeActions activeActions={{ print: true, lifecycle: true }} />
    ),
    ExpenseActions: (
      <ExpenseActions activeActions={{ coloration: true, lifecycle: true }} />
    ),
    AntdInfoCell: <AntdInfoCell />,
    LangWrapper: <LangWrapper val="English" value="English" />,
    HalfBorder: <HalfBorder>12</HalfBorder>,
    StudentBalancePopover: <StudentBalancePopover />,
  };
};

export default RenderThirdComponent;
