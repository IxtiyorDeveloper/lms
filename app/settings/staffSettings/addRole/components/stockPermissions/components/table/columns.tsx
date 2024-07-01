import { ICategoryPermissions } from "types";
import { Cell, CheckBox, TableHeading } from "components";
import Switch from "components/antd/switch";
import { useMemo } from "react";
import { extractMatchingValues } from "./components/extractMatchingValues";

const stockCPL = {
  admin_can_see_product: "View",
  admin_can_create_arrival: "Arrival",
  admin_can_create_departure: "Departure",
  admin_can_create_change: "Change",
  admin_can_create_transfer: "Transfer",
};

export const Columns = ({
  control,
  setValue,
  watchAll,
  category_permission,
}: {
  setValue: any;
  getValues: any;
  watchAll: any;
  control: any;
  category_permission?: ICategoryPermissions[];
}) => {
  const permissions = category_permission?.[0]?.permissions;

  return useMemo(() => {
    const handleColumnChange = ({
      checked,
      permission,
    }: {
      checked: boolean;
      permission: string;
    }) => {
      if (category_permission)
        for (let i = 0; i < category_permission?.length; i++) {
          const current = category_permission?.[i];

          if (checked) {
            setValue(`p_${current.id}_${permission}`, true);
          } else {
            setValue(`p_${current.id}_${permission}`, false);
          }
        }
    };

    const handleSetAllValues = ({ checked }: { checked: boolean }) => {
      const extracted = extractMatchingValues({ inputObject: watchAll });
      for (const [key, value] of Object.entries(extracted)) {
        setValue(key, checked);
      }
    };

    let columns: any = [];

    if (permissions) {
      for (let i = 0; i < permissions?.length; i++) {
        const permission = permissions[i];

        columns = [
          ...columns,
          {
            dataIndex: permission.permission,
            title: (
              <TableHeading className="flex-header" padding>
                <div className="switch-header">
                  <p className="name">
                    {stockCPL[permission.permission as keyof typeof stockCPL]}{" "}
                  </p>
                  <Switch
                    size="small"
                    name={`p_${permission?.permission}`}
                    control={control}
                    onChange={(checked) =>
                      handleColumnChange({
                        checked,
                        permission: permission?.permission,
                      })
                    }
                  />
                </div>
              </TableHeading>
            ),
            render: (value: any, record: ICategoryPermissions) => {
              const permission = record?.permissions?.[i];
              return (
                <Cell className="flex">
                  <CheckBox
                    name={`p_${record.id}_${permission.permission}`}
                    control={control}
                  />
                </Cell>
              );
            },
          },
        ];
      }
    }

    return [
      {
        dataIndex: "name",
        width: "20%",
        title: (
          <TableHeading padding>
            <div className="switch-header">
              All Access
              <Switch
                size="small"
                name="stock_all"
                // onChange={(checked) => {
                //   values.map((j) => {
                //     data.map((i) => {
                //       setValue(`vacancy_list.${i?.id}-${j.value}`, checked);
                //     });
                //   });
                // }}
                onChange={(checked) => handleSetAllValues({ checked })}
                control={control}
              />
            </div>
          </TableHeading>
        ),
        render: (value: any) => {
          return (
            <Cell className="cell">
              <div className="item">{value}</div>
            </Cell>
          );
        },
      },
      ...columns,
    ];
  }, [category_permission, watchAll]);
};
