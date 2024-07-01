import _ from "lodash";
import { IConfigVacancy } from "types";
import JobListRow from "../jobListRow";
import { PanelHeaderWrapper } from "./style";

export const Panel = ({
  data,
  control,
}: {
  data?: IConfigVacancy[];
  control?: any;
}) => {
  const groupByData = _.groupBy(data, "department.id");

  const panelGroup = _.map(groupByData, (item: IConfigVacancy[], index) => {
    return {
      key: index,
      label: (
        <PanelHeaderWrapper>{item?.[0]?.department?.name}</PanelHeaderWrapper>
      ),
      children: (
        <div className="items">
          {item?.map((vacancy, index) => {
            return (
              <JobListRow
                key={vacancy.role_id}
                id={vacancy.role_id}
                index={index + 1}
                control={control}
                title={vacancy.role_name}
                status={vacancy.status}
                department_id={vacancy.department?.id}
              />
            );
          })}
        </div>
      ),
    };
  }) as any;

  return panelGroup;
};
