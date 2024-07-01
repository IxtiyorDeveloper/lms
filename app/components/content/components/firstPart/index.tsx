import React, { useState } from "react";
import {
  AcademicTab,
  ActionModal,
  AntdBadge,
  Badge,
  Button,
  Cell,
  CheckBox,
  CircleImage,
  ColorSelect,
  ComplexThinTab,
  ContentRadio,
  CustomSelect,
  DebounceSelect,
  DraggableTable,
  ErrorLabel,
  Gender,
  Input,
  InputWithIcon,
  ItemPicker,
  LabelSlotSearchSelect,
  MainHeadWithTitle,
  MyDateRangePicker,
  MyLink,
  MySelect,
  PhoneNumberInput,
  PhoneNumberInput2,
  Radios,
  RoundedTab,
  Segmented,
  SelectMonth,
  SelectYear,
  SmsCheck,
  SourceSelect,
  TableHeading,
  TableSkeleton,
  TakeModal,
  TextBg,
  TimePicker,
  UploadImage,
  UserProfile,
} from "components";
import { useForm } from "react-hook-form";
import { SearchSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { DeleteSvg } from "components";
import { usePageDataMemo } from "hooks";
import { MaleSvg } from "components";
import { Columns, options, tabs, takeModalData } from "./data";
import { IOption } from "components/common/select/type";
import { fetchSearchFields } from "utils";
import { IContacts } from "types/contact";
import StudentSearchLabel from "globals/components/new-transactionModal/components/income/components/topCard/components/selectedStudent";

const RenderFirstComponents = () => {
  const [open, setOpen] = useState(true);
  const selects = usePageDataMemo();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = () => {};

  return {
    Input: <Input control={control} name="input" label="Input" />,
    PhoneNumberInput: (
      <PhoneNumberInput
        control={control}
        name="phoneNumberInput"
        label="PhoneNumberInput"
      />
    ),
    PhoneNumberInput2: (
      <PhoneNumberInput2
        control={control}
        name="phoneNumberInput2"
        label="PhoneNumberInput2"
      />
    ),
    Button: <Button>Button</Button>,
    Badge: <Badge text="12">Badge</Badge>,
    AntdBadge: <AntdBadge content="2">AntdBadge</AntdBadge>,
    TextBg: <TextBg text="TextBg" />,
    SelectMonth: <SelectMonth />,
    AcademicTab: <AcademicTab menu={options} />,
    Segmented: <Segmented options={options} />,
    InputWithIcon: (
      <InputWithIcon control={control} icon={SearchSvg} name="InputWithIcon" />
    ),
    CustomSelect: <CustomSelect name="CustomSelect" control={control} />,
    RoundedTab: <RoundedTab tabs={tabs} />,
    MySelect: <MySelect control={control} name="MySelect" />,
    ColorSelect: <ColorSelect control={control} name="ColorSelect" />,
    ActionModal: (
      <ActionModal
        handleSubmit={handleSubmit}
        handleClose={() => setOpen(false)}
        open={open}
        onSubmit={() => handleChange()}
        blurColor={bgColors.pop}
        label="Reason *"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
        icon={<DeleteSvg width={50} height={50} />}
        text={
          <div>
            <p>Are you sure?</p>
            <p>This property will be deleted for everyone</p>
          </div>
        }
        control={control}
      />
    ),
    ItemPicker: <ItemPicker />,
    TimePicker: <TimePicker control={control} name="TimePicker" />,
    LabelSlotSearchSelect: <LabelSlotSearchSelect data={undefined} />,
    MyDateRangePicker: (
      <MyDateRangePicker control={control} name="MyDateRangePicker" />
    ),
    ErrorLabel: <ErrorLabel error={errors?.name?.message} />,
    SourceSelect: (
      <SourceSelect
        control={control}
        data={selects.source as any}
        name="SourceSelect"
      />
    ),
    SmsCheck: (
      <SmsCheck
        onCompleted={(value: string) => handleChange()}
        label="Staff confirmation"
      />
    ),
    Gender: (
      <Gender
        label="Gender"
        value={1}
        name="root.gender"
        control={control}
        icon={(checked) => (
          <MaleSvg color={checked ? bgColors.black : bgColors.brotherBlue} />
        )}
        checkedColor={bgColors.primary}
      />
    ),
    SelectYear: <SelectYear />,
    ContentRadio: (
      <ContentRadio
        control={control}
        label="ContentRadio"
        name="ContentRadio"
      />
    ),
    TableHeading: <TableHeading>TableHeading</TableHeading>,
    CheckBox: <CheckBox control={control} name="CheckBox" label="CheckBox" />,
    Radios: <Radios control={control} name="Radios" />,
    TableSkeleton: <TableSkeleton />,
    TakeModal: (
      <TakeModal control={control} data={takeModalData} name="TakeModal" />
    ),
    ComplexThinTab: <ComplexThinTab menu={options} />,
    UploadImage: (
      <UploadImage control={control} name="UploadImage" setValue={setValue} />
    ),
    DraggableTable: <DraggableTable columns={Columns()} data={[]} />,
    Cell: <Cell>Cell Wrapper</Cell>,
    MainHeadWithTitle: <MainHeadWithTitle title="Login | LMS" />,
    MyLink: <MyLink href="/components">MyLink</MyLink>,
    UserProfile: <UserProfile props={undefined} />,
    CircleImage: <CircleImage />,
    DebounceSelect: (
      <DebounceSelect
        fetchOptions={async (searchString) => {
          const options: IOption[] = await fetchSearchFields({
            search: searchString,
            labelShow: (active: IContacts) => {
              return <StudentSearchLabel props={active} />;
            },
          });
          return options;
        }}
        name="DebounceSelect"
        control={control}
      />
    ),
  };
};

export default RenderFirstComponents;
