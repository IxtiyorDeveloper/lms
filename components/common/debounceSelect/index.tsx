import { useEffect, useMemo, useRef, useState } from "react";
import { ConfigProvider, Spin } from "antd";
import debounce from "lodash/debounce";
import { DebounceSelectProps } from "./type";
import { AntSelect, ContentWrapper, EmptyIcon, Wrapper } from "./style";
import { DefaultOptionType } from "antd/lib/select";
import { Controller, useController } from "react-hook-form";
import { Label } from "../input/style";
import ErrorLabel from "../errorLabel";
import { bgColors } from "styles/theme";

function DebounceSelect({
  fetchOptions,
  afterFetch,
  showDefaultValue = false,
  debounceTimeout = 400,
  name,
  control,
  error,
  required,
  label,
  defaultValue,
  isValue = false,
  multiSelect = undefined,
  urlKey,
  extraParams,
  defaultOption,
  ...props
}: DebounceSelectProps & { defaultOption?: any[]; defaultUserId?: any }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const fetchRef = useRef<number>(0);
  const { field } = useController({ control, name });

  useEffect(() => {
    field.onChange(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (!!defaultOption) {
      field.onChange(defaultOption?.[0]?.value);
      setOptions(defaultOption);
    }
  }, [defaultOption]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value = "") => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) return;
        setOptions(newOptions);
        afterFetch?.(options[0]);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, afterFetch, options, urlKey, extraParams]);

  useEffect(() => {
    if (!!urlKey) debounceFetcher("");
  }, [urlKey]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: bgColors.primary,
        },
        components: {
          Select: {
            controlItemBgActive: bgColors.primary,
            controlInteractiveSize: 12,
            fontWeightStrong: 500,
          },
        },
      }}
    >
      <Wrapper required={label ? false : required!} error={error!}>
        {label && <Label required={!!required}>{label}</Label>}
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => {
            return (
              <AntSelect<DefaultOptionType>
                mode={multiSelect}
                allowClear={true}
                filterOption={false}
                onSearch={debounceFetcher}
                onChange={field.onChange}
                onFocus={() => !options?.length && debounceFetcher("")}
                notFoundContent={
                  <ContentWrapper>
                    {fetching ? <Spin size="default" /> : <EmptyIcon />}
                  </ContentWrapper>
                }
                defaultValue={defaultValue}
                options={options}
                {...(isValue ? { value: field?.value } : {})}
                {...props}
              />
            );
          }}
        />
        <ErrorLabel error={error!} />
      </Wrapper>
    </ConfigProvider>
  );
}

export default DebounceSelect;
