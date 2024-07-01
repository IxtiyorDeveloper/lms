import React, { FC } from "react";
import { Button, RedBadgeTitle } from "components";
import { CurrentRow } from "./style";
import { useRouter } from "next/router";

interface IProps {
  dataView: any;
}

const TitleSection: FC<IProps> = (props) => {
  const { dataView } = props;
  const router = useRouter();

  return (
    <CurrentRow>
      <RedBadgeTitle title={dataView?.name} />
      <Button
        onClick={() => {
          router.replace(
            {
              pathname: `/settings/staff-settings/create-role/${router.query?.staffsGroupId}`,
              query: {
                type: "update",
                roleId: router.query.staffsGroupId,
                dep_id: dataView?.department_id,
              },
            },
            undefined,
            { scroll: false }
          );
        }}
      >
        Update
      </Button>
    </CurrentRow>
  );
};

export default TitleSection;
