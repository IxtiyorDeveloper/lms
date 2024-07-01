import { FC, Fragment, useCallback } from "react";
import { Controller } from "react-hook-form";
import { ISelectProps } from "./type";
import { AntSelect, Wrapper, Label, IconWrapper } from "./style";
import ErrorLabel from "../input/errorLabel";
import { ConfigProvider, Select as AntdSelect, Skeleton } from "antd";
import { bgColors } from "styles/theme";
import { ESelectAll } from "types";
import { selectAllEqual } from "./utils/selectAllEqual";
import { selectAll } from "./utils/selectAll";

const { Option } = AntdSelect;

const Select: FC<ISelectProps> = ({
  options = null,
  name,
  control,
  error,
  placeholder,
  defaultOpen,
  open,
  defaultValue,
  label = "",
  required = false,
  disabled = false,
  loading = false,
  mode,
  icon,
  showSearch = true,
  onSearch,
  bgColor,
  style,
  allowClear = true,
  labelInValue = false,
  listHeight = 300,
  className,
  isSelectAll = false,
  maxTagCount = false,
  dropdownRender,
  selectAllType = ESelectAll.regular,
  onChangeValue,
  ...props
}) => {
  const onChangeHandle = useCallback(
    (value: any[], onChange: (...event: any[]) => void) => {
      if (mode === "multiple" && isSelectAll) {
        if (value.some((v) => v === "all")) {
          if (selectAllEqual({ selectAllType, options, value })) {
            onChange([]);
          } else selectAll({ selectAllType, options, onChange });
        } else {
          onChange(value);
        }
      } else {
        onChange(value);
      }
    },
    [options, mode, isSelectAll],
  );

  const renderOptions = useCallback(() => {
    return (
      <Fragment>
        {options?.length &&
          options?.map(({ label, value, disabled, extra }) => (
            <Option
              key={value?.toString()}
              value={value}
              disabled={disabled}
              extra={extra}
              optionLabelProp={props?.optionLabelProp}
            >
              {label}
            </Option>
          ))}
      </Fragment>
    );
  }, [options, props?.optionLabelProp]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: bgColors.primary,
        },
        components: {
          Select: {
            controlHeight: 36,
            controlInteractiveSize: 12,
          },
        },
      }}
    >
      <Wrapper
        required={label ? false : required}
        error={error}
        className={className}
      >
        {label && <Label required={required}>{label}</Label>}
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { value, onChange } }) => {
            return (
              <div className={!!icon ? "wrapper-icon" : ""} style={style}>
                {icon && <IconWrapper>{icon}</IconWrapper>}
                <AntSelect
                  disabled={disabled}
                  value={value}
                  onChange={(value: any) => {
                    onChangeHandle(value, onChange);
                    onChangeValue?.(value);
                  }}
                  style={{ width: "100%", ...style }}
                  placeholder={placeholder}
                  notFoundContent={
                    loading ? <Skeleton.Button active block /> : null
                  }
                  mode={mode}
                  showSearch={showSearch}
                  optionFilterProp="children"
                  listHeight={listHeight}
                  defaultOpen={defaultOpen}
                  allowClear={allowClear}
                  onSearch={onSearch}
                  loading={loading}
                  labelInValue={labelInValue}
                  defaultValue={defaultValue}
                  // showArrow={true}
                  onClear={() => onChange("")}
                  open={open}
                  bgcolor={bgColor}
                  dropdownRender={dropdownRender}
                  maxTagCount={isSelectAll ? 1 : maxTagCount}
                  {...props}
                >
                  {isSelectAll && (
                    <Option
                      key="select-all"
                      value="all"
                      className={() => {
                        return selectAllEqual({ selectAllType, options, value })
                          ? "selected-all"
                          : "not-selected-all";
                      }}
                    >
                      Select All
                    </Option>
                  )}
                  {renderOptions()}
                </AntSelect>
              </div>
            );
          }}
        />
        <ErrorLabel error={error!} />
      </Wrapper>
    </ConfigProvider>
  );
};

export default Select;
