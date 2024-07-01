import React, { FC } from "react";
import { useRolePageDataMemo } from "hooks/useRole";
import _ from "lodash";
import { Controller } from "react-hook-form";
import { Grid } from "@mui/material";
import { ConfigProvider, Radio } from "antd";
import { bgColors } from "styles/theme";
import { useRouter } from "next/router";

const ApplicationTokens: FC<{ control: any }> = ({ control }) => {
  const selects = useRolePageDataMemo();
  const router = useRouter();
  return (
    <div>
      <Controller
        control={control}
        render={({ field }) => {
          const onChange = (key: string, value: string) => {
            field.onChange(
              !!field.value
                ? _.uniqBy(
                    [
                      ...field.value,
                      { application_key: key, role: value },
                    ].reverse(),
                    (e) => e.application_key
                  )
                : [{ application_key: key, role: value }]
            );
          };

          return (
            <div>
              {_.map(
                selects?.application_roles,
                (value: string[], key: string) => {
                  return (
                    <div key={`key_${key}${value}`}>
                      <div
                        style={{
                          marginBottom: "10px",
                          marginTop: "40px",
                          display: "flex",
                          gap: "10px",
                          justifyContent: "space-between",
                        }}
                      >
                        {key}
                      </div>
                      <Grid container spacing="10px">
                        {(value as any)?.map((e: string, index: number) => {
                          return (
                            (!router.query.search ||
                              e.includes(router.query.search as string)) && (
                              <Grid
                                key={`index_${index}`}
                                item
                                xl={4}
                                lg={6}
                                md={12}
                                sm={12}
                                xs={12}
                              >
                                <ConfigProvider
                                  theme={{
                                    token: {
                                      colorPrimary: bgColors.primary,
                                    },
                                  }}
                                >
                                  <Radio
                                    name={key}
                                    children={e}
                                    onChange={() => onChange(key, e)}
                                    checked={
                                      !!_.find(
                                        field.value,
                                        (item) =>
                                          item.application_key === key &&
                                          item.role === e
                                      )
                                    }
                                  />
                                </ConfigProvider>
                              </Grid>
                            )
                          );
                        })}
                      </Grid>
                    </div>
                  );
                }
              )}
            </div>
          );
        }}
        name="application_roles"
      />
    </div>
  );
};

export default ApplicationTokens;
