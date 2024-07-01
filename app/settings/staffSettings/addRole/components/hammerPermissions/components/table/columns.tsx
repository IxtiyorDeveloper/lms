import { IHrRbacPermissions } from "types";
import { Cell, CheckBox, TableHeading } from "components";
import Switch from "components/antd/switch";
import { map } from "lodash";

const values = [
  { value: "is_responsible", label: "Responsible" },
  { value: "is_supervisor", label: "Supervisor" },
  { value: "is_staff", label: "Staff" },
];

export const columns = ({
  control,
  setValue,
  watch,
  data,
}: {
  setValue: any;
  getValues: any;
  watch: any;
  control: any;
  data: IHrRbacPermissions["category_config"];
}) => {
  const bool = map(watch(`vacancy_list.b`), (value) => {
    return value;
  }).find((e) => !e);

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
              name="vacancy_list.all"
              onChange={(checked) => {
                values.map((j) => {
                  data.map((i) => {
                    setValue(`vacancy_list.${i?.id}-${j.value}`, checked);
                  });
                });
              }}
              control={control}
              watchDefaultValue
              defaultValue={bool || bool == undefined}
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
    ...values.map((e) => {
      let bool = true;
      map(watch(`vacancy_list.a`), (value, key) => {
        if (key.includes(e.value) && !value) {
          bool = false;
        }
      });
      return {
        dataIndex: e.value,
        width: `${90 / data?.length}%`,
        title: (
          <TableHeading className="flex-header" padding>
            <div className="switch-header">
              <p className="name">{e.label} </p>
              <Switch
                size="small"
                name={`vacancy_list.b.${e.value}`}
                control={control}
                watchDefaultValue
                onChange={(checked) => {
                  data.map((i) => {
                    setValue(`vacancy_list.a.${i?.id}-${e.value}`, checked);
                  });
                }}
                defaultValue={bool}
              />
            </div>
          </TableHeading>
        ),
        render: (value: 1 | 0, record: any) => {
          return (
            <Cell className="flex">
              <CheckBox
                name={`vacancy_list.a.${record?.id}-${e.value}`}
                defaultValue={(value == 1) as any}
                control={control}
              />
            </Cell>
          );
        },
      };
    }),
  ];
};
