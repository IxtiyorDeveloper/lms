import React from "react";
import { Segmented } from "components";
import { useRouter } from "next/router";
import { Wrapper } from "./style";
import ProductAndServiceTable from "../productAndService";
import TableComponent from "../tableComponent";

const Details = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <Segmented
        segmentedWidth="100%"
        block
        options={[
          {
            label: <div>Educational</div>,
            children: <TableComponent />,
            value: "1",
          },
          {
            label: <div>Product and service</div>,
            children: <ProductAndServiceTable />,
            value: "2",
          },
        ]}
        routerKey="detailsTabId"
        initValue={(router.query.detailsTabId as string) ?? "1"}
      />
    </Wrapper>
  );
};

export default Details;
