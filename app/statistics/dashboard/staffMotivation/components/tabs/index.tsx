import React, { FC, useMemo } from "react";
import { IPropsCashFlow } from "../../index";
import { Button } from "components";
import { useRouter } from "next/router";

const Tabs: FC<IPropsCashFlow> = ({ chartData }) => {
  const router = useRouter();
  const width = useMemo(() => `${100 / (chartData.length || 0)}%`, [chartData]);
  const role_id = router.query.role_id;
  const bool = (index: number, e: any) => {
    return !!role_id && role_id != e.roleId
      ? 0.4
      : role_id == e.roleId || index === 0
      ? 1
      : 0.4;
  };
  return (
    <div className="tabs">
      {chartData.reverse().map((e, index) => {
        return (
          <Button
            onClick={() =>
              router.replace(
                {
                  pathname: router.pathname,
                  query: { ...router.query, role_id: e.roleId },
                },
                undefined,
                { scroll: false }
              )
            }
            style={{
              background: e.color,
              width,
              opacity: bool(index, e),
            }}
          >
            {`${e.name} (${e.count})`}
          </Button>
        );
      })}
    </div>
  );
};

export default Tabs;
