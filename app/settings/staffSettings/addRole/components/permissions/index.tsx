import React, { FC } from "react";
import { map, find, uniq, concat, difference, flatten, values } from "lodash";
import { Controller } from "react-hook-form";
import { Grid } from "@mui/material";
import { Checkbox, ConfigProvider } from "antd";
import { bgColors } from "styles/theme";
import { useRouter } from "next/router";
import { Wrapper } from "./style";
import Switch from "components/antd/switch";
import { IHrRbacPermissions } from "types";
import { Badge } from "../../style";

const Permissions: FC<{
  control: any;
  watch: any;
  data?: IHrRbacPermissions;
}> = ({ control, data, watch }) => {
  const router = useRouter();

  return (
    <Wrapper>
      <Controller
        control={control}
        render={({ field }) => {
          const onChange = (bool: boolean, e: string) => {
            if (!bool) {
              field.onChange(field.value.filter((item: any) => item !== e));
            } else {
              field.onChange(!!field.value ? [...field.value, e] : [e]);
            }
          };

          let isAllItemChecked = true;
          const allItem = flatten(values(data?.allPermissions));

          for (let i = 0; i < allItem.length; i++) {
            if (!find(field.value, (item) => item === allItem?.[i])) {
              isAllItemChecked = false;
              break;
            }
          }

          const onClickAllItem = async (bool: boolean) => {
            for (let i = 0; i < allItem.length; i++) {
              if (!bool) {
                field.onChange(difference(field.value, allItem));
              } else {
                field.onChange(uniq(concat(field.value, allItem)));
              }
            }
          };

          return (
            <div>
              <div className="check-wr">
                All Access
                <Switch
                  name="all_permissions"
                  control={control}
                  onChange={onClickAllItem}
                  defaultValue={isAllItemChecked}
                  watchDefaultValue
                  size="small"
                />
                <Badge style={{ marginLeft: "8px" }}>
                  {watch("permissions")?.length || 0}
                </Badge>
              </div>

              {map(data?.allPermissions, (value: string[], key) => {
                let isAllChecked = true;
                const values = value as string[];
                for (let i = 0; i < values.length; i++) {
                  if (!find(field.value, (item) => item === values?.[i])) {
                    isAllChecked = false;
                    break;
                  }
                }
                const onClickAll = (bool: boolean) => {
                  for (let i = 0; i < values.length; i++) {
                    if (!bool) {
                      field.onChange(difference(field.value, values));
                    } else {
                      field.onChange(uniq(concat(field.value, values)));
                    }
                  }
                };

                return (
                  <div key={`key_${key}${value}`}>
                    <div className="current-per">
                      {key}
                      <Switch
                        name={`switch_${key}${value}`}
                        control={control}
                        onChange={onClickAll}
                        defaultValue={isAllChecked}
                        watchDefaultValue
                        size="small"
                      />
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
                                <Checkbox
                                  children={e}
                                  onChange={(event) =>
                                    onChange(event.target.checked, e)
                                  }
                                  checked={
                                    !!find(field.value, (item) => item === e)
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
              })}
            </div>
          );
        }}
        name="permissions"
      />
    </Wrapper>
  );
};

export default Permissions;
