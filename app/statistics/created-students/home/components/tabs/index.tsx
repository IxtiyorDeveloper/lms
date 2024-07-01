import React from "react";
import { Wrapper } from "./style";
import { Segmented } from "components";
import { menu } from "./components/menu";
import { ITabs } from "./type";
import { useRouter } from "next/router";

const Tabs = ({ tab_id, data }: ITabs) => {
  const router = useRouter();
  return (
    <Wrapper>
      <Segmented
        block
        options={menu({ data })}
        onChange={(e: any) => {
          router.replace({
            pathname: router.pathname,
            query: {
              ...router.query,
              tab_id: e,
            },
          });
        }}
        initValue={tab_id}
        routerKey="tab_id"
      />
    </Wrapper>
  );
};

export default Tabs;
