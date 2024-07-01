import React, { useEffect, useState } from "react";
import { StyledSegment, Wrapper } from "./style";
import Router from "next/router";

interface Interface {
  options: { value: string | number; icon: React.ReactNode }[];
  initValue?: string | number;
  routerKey?: string;
  action?: React.ReactNode;
  tabPlace?: "left" | "right";
  onChange?: (e: any) => void;
}

const CircleSegment = ({
  options,
  initValue,
  routerKey,
  action,
  tabPlace = "left",
  onChange,
}: Interface) => {
  const [value, setValue] = useState<number | string | undefined>(
    initValue?.toString(),
  );
  const handleChange = (e: any) => {
    onChange?.(e);
    setValue(e);
    if (routerKey) {
      Router.replace(
        {
          pathname: Router.pathname,
          query: { ...Router.query, [routerKey]: e },
        },
        undefined,
        {
          scroll: false,
        },
      );
    }
  };
  useEffect(() => {
    if (initValue) setValue(initValue);
  }, [initValue]);
  return (
    <Wrapper tabPlace={tabPlace}>
      <StyledSegment options={options} onChange={handleChange} value={value} />
      {action}
    </Wrapper>
  );
};

export default CircleSegment;
