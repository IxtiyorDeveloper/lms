import React, { FC, Fragment } from "react";
import { Segmented } from "components";
import { useRouter } from "next/router";
import AntdBadge from "components/common/antdBadge";
import { ConfigProvider } from "antd";

export enum teacherClassValues {
  a = "100",
  b = "200",
  c = "300",
}

interface IProps {
  init: string;
  counts: { [key: string]: number };
}
const Tabs: FC<IProps> = ({ init, counts }) => {
  const router = useRouter();
  return (
    <Fragment>
      {!router.query.status &&
      ((router.query.type as string) === "100" || !router.query.type) ? (
        <ConfigProvider
          theme={{
            components: {
              Segmented: {
                colorBgLayout: "red",
              },
            },
          }}
        >
          <Segmented
            options={[
              {
                label: (
                  <div className="flex">
                    A class
                    <AntdBadge
                      showZero
                      overflowCount={1000}
                      content={counts?.[teacherClassValues.a]}
                    />
                  </div>
                ),
                value: teacherClassValues.a,
              },
              {
                label: (
                  <div className="flex">
                    B class{" "}
                    <AntdBadge
                      showZero
                      overflowCount={1000}
                      content={counts?.[teacherClassValues.b]}
                    />
                  </div>
                ),
                value: teacherClassValues.b,
              },
              {
                label: (
                  <div className="flex">
                    C class{" "}
                    <AntdBadge
                      showZero
                      overflowCount={1000}
                      content={counts?.[teacherClassValues.c]}
                    />
                  </div>
                ),
                value: teacherClassValues.c,
              },
            ]}
            block
            routerKey="class"
            initValue={init}
          />
        </ConfigProvider>
      ) : (
        <div></div>
      )}
    </Fragment>
  );
};

export default Tabs;
