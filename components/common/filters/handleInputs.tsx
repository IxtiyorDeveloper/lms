import React from "react";
import {
  CheckBox,
  Input,
  InputWithIcon,
  MyDateRangePicker,
  MySelect,
  PhoneNumberInput,
  TreeSelect,
} from "../index";
import { SearchSvg } from "../../elements";
import { AntdSwitch, DatePicker, InputNumber } from "../../antd";
import DebounceSelect from "../debounceSelect";

const handleInputs = ({
  name,
  options,
  label,
  control,
  placeholder,
  disabled,
  fetchOptions,
  args,
}: {
  name: string;
  options?: string;
  label?: string | React.ReactNode;
  control: any;
  placeholder?: string;
  fetchOptions?: (search: string) => Promise<any>;
  disabled?: boolean;
  args: any;
}) => {
  return {
    input: (
      <Input
        name={name}
        control={control}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        {...args}
      />
    ),
    search: (
      <InputWithIcon
        placeholder={placeholder}
        icon={SearchSvg}
        name={name}
        control={control}
        label={label}
        disabled={disabled}
        {...args}
      />
    ),
    select: (
      <MySelect
        name={name}
        control={control}
        label={label}
        placeholder={placeholder}
        options={options}
        disabled={disabled}
        {...args}
      />
    ),
    phone: (
      <PhoneNumberInput
        name={name}
        control={control}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        {...args}
      />
    ),
    number: (
      <InputNumber
        name={name}
        label={label}
        control={control}
        className="currency"
        placeholder={placeholder}
        disabled={disabled}
        {...args}
      />
    ),
    money: (
      <InputNumber
        name={name}
        label={label}
        control={control}
        suffix={<div className="suffix">UZS</div>}
        className="currency"
        placeholder={placeholder}
        disabled={disabled}
        {...args}
      />
    ),
    rangePicker: (
      <MyDateRangePicker
        name={name}
        label={label}
        control={control}
        disabled={disabled}
        {...args}
      />
    ),
    datePicker: (
      <DatePicker
        name={name}
        label={label}
        control={control}
        disabled={disabled}
        {...args}
      />
    ),
    checkbox: (
      <div className="checkbox">
        <CheckBox control={control} name={name} {...args}>
          {label}
        </CheckBox>
      </div>
    ),
    switch: (
      <AntdSwitch control={control} name={name} label={label} {...args} />
    ),
    treeSelect: (
      <TreeSelect
        name={name}
        control={control}
        label={label}
        placeholder={placeholder}
        options={options}
        disabled={disabled}
        {...args}
      />
    ),
    debounceSelect: (
      <DebounceSelect
        name={name}
        style={{ marginBottom: "5px" }}
        showSearch
        control={control}
        label={label}
        placeholder={placeholder}
        fetchOptions={fetchOptions}
        disabled={disabled}
        {...args}
      />
    ),
  };
};
export default handleInputs;
