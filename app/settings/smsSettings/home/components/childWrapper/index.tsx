import React, { FC, useMemo } from "react";
import { ComplexThinTab } from "components";
import { ChildWrapper, Flex } from "./style";
import AutoSMS from "../autoSms";
import ManualTemplates from "../manualTemplates";
import { ICron } from "types";
import { useRouter } from "next/router";

interface IProps {
  data: ICron[];
  isLoading: boolean;
}

const ChildComponent: FC<IProps> = ({ data, isLoading }) => {
  const router = useRouter();

  const tabs = useMemo(
    () => [
      {
        label: "Auto SMS",
        children: (
          <AutoSMS
            data={data?.filter(
              (p) =>
                p.project ==
                (router.query?.tabKey ? router.query?.tabKey : "LMS"),
            )}
            isLoading={isLoading}
          />
        ),
      },
      {
        label: <Flex>Manual Templates</Flex>,
        children: <ManualTemplates />,
      },
    ],
    [data, isLoading],
  );

  return (
    <ChildWrapper>
      <ComplexThinTab menu={tabs} />
    </ChildWrapper>
  );
};

export default ChildComponent;
