import React, { useCallback, useEffect, useState } from "react";
import { StyledSegment, Wrapper, Container } from "./style";
import { useRouter } from "next/router";
import { stopPropagation } from "utils/stopPropagation";

interface Interface {
  options: {
    value?: string | number;
    icon?: React.ReactNode;
    label: string | React.ReactNode;
    children?: string | React.ReactNode;
  }[];
  initValue?: string | number;
  routerKey?: string;
  segmentedWidth?: string;
  action?: React.ReactNode;
  tabPlace?: "left" | "right";
  onChange?: any;
  dark?: boolean;
  block?: boolean;
  watchInitialValue?: boolean;
}

const AntdThinTab = ({
  options,
  initValue = "0",
  routerKey,
  action,
  onChange,
  dark,
  segmentedWidth,
  tabPlace = "left",
  block,
  watchInitialValue = false,
}: Interface) => {
  const router = useRouter();
  const [value, setValue] = useState<number | string | undefined>(
    initValue?.toString(),
  );
  const handleChange = useCallback(
    (e: any) => {
      const { page, pageSize } = router.query;
      setValue(e?.toString());
      if (routerKey) {
        if (page || pageSize) {
          router.replace(
            {
              pathname: router.pathname,
              query: { ...router.query, page: 1, pageSize: 20, [routerKey]: e },
            },
            undefined,
            { scroll: false },
          );
        } else {
          router.replace(
            {
              pathname: router.pathname,
              query: { ...router.query, [routerKey]: e },
            },
            undefined,
            { scroll: false },
          );
        }
      }
      onChange?.(e);
    },
    [router.query, routerKey, onChange],
  );

  useEffect(() => {
    watchInitialValue
      ? handleChange(initValue?.toString())
      : setValue(initValue?.toString());
  }, [initValue, watchInitialValue]);

  return (
    <Container
      className="segmented-content-container"
      onClick={stopPropagation}
    >
      <Wrapper tabPlace={tabPlace} className="segmented-content-wrapper">
        <StyledSegment
          width={segmentedWidth}
          dark={dark}
          options={options as any}
          onChange={handleChange}
          value={value?.toString()}
          block={block}
        />
        {action}
      </Wrapper>
      {
        options?.find(
          (option) =>
            option.value?.toString() === (value as keyof typeof options),
        )?.children
      }
    </Container>
  );
};

export default AntdThinTab;
