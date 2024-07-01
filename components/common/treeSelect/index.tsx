import { FC, ReactNode } from "react";
import Spin from "antd/lib/spin";
import { Controller } from "react-hook-form";
import { ISelectProps } from "./type";
import { AntSelect, Wrapper, Label, IconWrapper } from "./style";
import ErrorLabel from "../input/errorLabel";
import { ConfigProvider, TreeSelectProps } from "antd";
import { bgColors } from "styles/theme";

const Select: FC<ISelectProps & TreeSelectProps> = ({
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
  getPopupContainer,
  treeCheckable,
  ...props
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: bgColors.primary,
        },
        components: {
          TreeSelect: {
            controlHeight: 46,
            controlItemBgActive: bgColors.primary,
            controlInteractiveSize: 12,
            fontSize: 12,
          },
          Select: {
            controlHeight: 36,
            controlItemBgActive: bgColors.primary,
            controlInteractiveSize: 12,
            fontSize: 12,
          },
        },
      }}
    >
      <Wrapper
        required={label ? false : required}
        error={error!}
        className={className}
      >
        {label && <Label required={required}>{label}</Label>}
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue?.value}
          render={({ field: { value, onChange } }) => {
            return (
              <div className={!!icon ? "wrapper-icon" : ""} style={style}>
                {icon && <IconWrapper>{icon}</IconWrapper>}
                <AntSelect
                  disabled={disabled}
                  value={value}
                  onChange={onChange}
                  style={{ width: "100%", ...style }}
                  placeholder={placeholder}
                  notFoundContent={loading ? <Spin size="small" /> : null}
                  mode={mode}
                  showSearch={showSearch}
                  // optionFilterProp="children"
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
                  bgColor={bgColor}
                  treeData={options}
                  treeNodeFilterProp="label"
                  getPopupContainer={getPopupContainer}
                  treeCheckable={treeCheckable}
                  {...props}
                ></AntSelect>
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
