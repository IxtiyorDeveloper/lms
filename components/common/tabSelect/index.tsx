import React, { useEffect, useMemo, useState } from "react";
import { Wrapper, AntSelect } from "./style";
import { ConfigProvider, Skeleton } from "antd";
import { bgColors } from "styles/theme";
import { Label } from "./style";
import { Controller, useForm } from "react-hook-form";
import ErrorLabel from "../input/errorLabel";
import { ITabSelect } from "./type";
import { ESelectAll } from "types";
import { generateTabOptions } from "./components/options";
import { concatOptions } from "./components/concatOptions";
import { handleSearch } from "./components/handleSearch";

const TabSelect = ({
  name,
  control,
  error,
  placeholder,
  defaultOpen,
  open: comingOpen,
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
  maxTagCount = 1,
  dropdownRender,
  selectAllType = ESelectAll.regular,
  colorBgContainer = bgColors.yukon,
  popupMatchSelectWidth,
  options,
  ...args
}: ITabSelect) => {
  const [open, setOpen] = useState(comingOpen);

  const { watch: optionsWatch, setValue } = useForm({
    defaultValues: {
      options,
    },
  });

  const currentOptions = optionsWatch("options");

  const flatOptions = useMemo(() => {
    return concatOptions({ data: currentOptions });
  }, [currentOptions]);

  const reset = () => {
    setValue("options", options);
  };
  const handleOpen = (visible: boolean) => {
    setOpen(visible);
  };

  const renderRowSubComponent = React.useCallback(
    (props: any) => generateTabOptions(props),
    [currentOptions],
  );

  useEffect(() => {
    if (options) {
      setValue("options", options);
    }
  }, [options]);

  return (
    <Wrapper error={!!error}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: bgColors.primary,
          },
          components: {
            Select: {
              controlHeight: 36,
              controlInteractiveSize: 12,
              colorBgContainer,
            },
          },
        }}
      >
        {label && (
          <Label required={required} htmlFor={name}>
            {label}
          </Label>
        )}
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { value, onChange }, formState: { errors } }) => {
            return (
              <AntSelect
                disabled={disabled}
                value={value}
                onChange={onChange}
                style={{ width: "100%", ...style }}
                placeholder={placeholder}
                notFoundContent={
                  loading ? <Skeleton.Button active block /> : null
                }
                mode={mode}
                optionFilterProp="children"
                listHeight={listHeight}
                defaultOpen={defaultOpen}
                allowClear={allowClear}
                onSearch={(searchText: string) =>
                  handleSearch({ searchText, data: options, setValue })
                }
                loading={loading}
                filterOption={false}
                labelInValue={labelInValue}
                defaultValue={defaultValue}
                onClear={() => {
                  onChange("");
                }}
                open={open}
                bgcolor={bgColor}
                popupMatchSelectWidth={popupMatchSelectWidth}
                onDropdownVisibleChange={handleOpen}
                maxTagCount={isSelectAll ? 1 : maxTagCount}
                {...args}
                options={flatOptions}
                dropdownRender={() =>
                  renderRowSubComponent({
                    data: currentOptions,
                    onChange,
                    value,
                    mode,
                    listHeight,
                    reset,
                    setOpen,
                  })
                }
              />
            );
          }}
        />
        <ErrorLabel error={error} />
      </ConfigProvider>
    </Wrapper>
  );
};

export default TabSelect;
