import React, { useEffect, useState } from "react";
import { StyledTabs, Wrapper } from "./style";
import { useRouter } from "next/router";

interface Interface {
  items: {
    label: string | React.ReactNode;
    key: string;
    children?: string | React.ReactNode;
  }[];
  initValue?: string;
  action?: React.ReactNode;
  routerKey?: string;
  tabPlace?: "left" | "right";
}

const DefaultTab: React.FC<Interface> = ({
  items,
  initValue,
  action,
  routerKey,
  tabPlace = "left",
}) => {
  const [value, setValue] = useState(initValue?.toString());
  const router = useRouter();
  const handleChange = (e: string) => {
    setValue(e);
    if (routerKey) {
      const { pathname, query } = router;
      const newQuery = { ...query, [routerKey]: e };
      router.replace({
        pathname: pathname,
        query: newQuery,
      });
    }
  };
  useEffect(() => {
    setValue(initValue);
  }, [initValue]);
  return (
    <Wrapper tabPlace={tabPlace}>
      <div className="mainTabs">
        <StyledTabs items={items} activeKey={value} onChange={handleChange} />
      </div>
      <div className="action">{action}</div>
    </Wrapper>
  );
};

export default DefaultTab;
