import {
  IHrRbacStageList,
  IHrRbacVacancyCandidateStage,
  IHrRbacVacancyList,
} from "types";
import { Cell, CheckBox, TableHeading } from "components";
import Switch from "components/antd/switch";

export const columns = ({
  control,
  stageList = [],
  setValue,
  watch,
  vacancyList,
}: {
  setValue: any;
  getValues: any;
  watch: any;
  control: any;
  stageList?: IHrRbacStageList[];
  vacancyList?: IHrRbacVacancyList[];
}) => {
  const bool = stageList
    .map((e) => watch(`vacancy_list.a.stage_${e.value}.all`))
    .find((e) => !e);
  return [
    {
      dataIndex: "title",
      width: "20%",
      title: (
        <TableHeading padding>
          <div className="switch-header">
            All Access
            <Switch
              size="small"
              name="vacancy_list.all"
              onChange={(checked) => {
                stageList.map((e) => {
                  setValue(`vacancy_list.a.stage_${e.value}.all`, checked);
                  vacancyList?.map(({ id: value, vacancyCandidateStages }) => {
                    const data = vacancyCandidateStages.find(
                      (i) => +i.stage == e.value
                    );
                    data?.id &&
                      setValue(
                        `vacancy_list.a.stage_${e.value}.values_${value}.id_${data?.id}`,
                        checked
                      );
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
    ...stageList.map((e) => {
      const bool = vacancyList
        ?.map(({ id: value, vacancyCandidateStages }) => {
          const data = vacancyCandidateStages.find((i) => +i.stage == e.value);
          return data?.id
            ? watch(
                `vacancy_list.a.stage_${e.value}.values_${value}.id_${data?.id}`
              )
            : true;
        })
        .find((e) => {
          return e == false;
        });
      return {
        dataIndex: "vacancyCandidateStages",
        width: `${90 / stageList.length}%`,
        title: (
          <TableHeading className="flex-header" padding>
            <div className="switch-header">
              <p className="name">{e.label} </p>
              <Switch
                size="small"
                name={`vacancy_list.a.stage_${e.value}.all`}
                control={control}
                watchDefaultValue
                onChange={(checked) => {
                  vacancyList?.map(({ id: value, vacancyCandidateStages }) => {
                    const data = vacancyCandidateStages.find(
                      (i) => +i.stage == e.value
                    );
                    data?.id &&
                      setValue(
                        `vacancy_list.a.stage_${e.value}.values_${value}.id_${data?.id}`,
                        checked
                      );
                  });
                }}
                defaultValue={bool || bool == undefined}
              />
            </div>
          </TableHeading>
        ),
        render: (value: IHrRbacVacancyCandidateStage[], record: any) => {
          const data = value.find((i) => +i.stage == e.value);
          return (
            <Cell className="flex">
              {data?.id && (
                <CheckBox
                  name={`vacancy_list.a.stage_${e.value}.values_${record.id}.id_${data?.id}`}
                  defaultValue={(data.is_checked == "1") as any}
                  control={control}
                />
              )}
            </Cell>
          );
        },
      };
    }),
  ];
};
