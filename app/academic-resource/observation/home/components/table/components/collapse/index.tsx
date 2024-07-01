import React from "react";
import { Wrapper } from "./style";
import { AntdTable } from "components";
import Columns from "./components/columns";
import { IMainObservation } from "types/observation";
import { useRouter } from "next/router";

const Collapse = ({ row }: { row: IMainObservation }) => {
  const router = useRouter();
  const observations = row?.observations;

  return (
    <Wrapper>
      <AntdTable
        columns={Columns()}
        dataSource={observations}
        rowClassName="custom-row"
        loading={false}
        onRow={(record) => {
          return {
            onClick: (event) => {
              const newURL = `/academic-resource/observation/${record?.id}`;

              router.push(newURL);
            }, // click row
          };
        }}
      />
    </Wrapper>
  );
};

export default Collapse;
