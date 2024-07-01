import { Badge, Checkbox } from "antd";
import { CheckBox } from "components";
import { IConfigVacancy, IVacancy } from "types";
import { CollapseItemWrapper, Title } from "./style";
import { CandidateStages } from "constants/hr";

export const Panel = ({
  data,
  control,
  vacancyData,
}: {
  data?: IVacancy;
  control: any;
  vacancyData?: IConfigVacancy[];
}) => {
  const panels =
    data?.stageList?.map((item) => {
      const stageItems = data?.vacancyResponsible?.filter(
        (res) => res?.stage === item.value
      );

      const body =
        stageItems?.map((res) => {
          const stage = vacancyData?.find(
            (vacancy) => vacancy?.role_id === res?.role_id
          );
          return {
            role_id: stage?.role_id,
            role_name: stage?.role_name,
          };
        }) || [];

      return {
        key: `${item.value}`,
        label: (
          <CollapseItemWrapper>
            <div className="col_item">
              <CheckBox
                control={control}
                name={`root.candidate_stages.${item.value}`}
                disabled={
                  item.value === CandidateStages.NEW ||
                  item.value === CandidateStages.REGISTRATION
                }
              />
              <Title>{item.label}</Title>
              <Badge count={body?.length}></Badge>
            </div>
          </CollapseItemWrapper>
        ),
        children: (
          <CollapseItemWrapper>
            {body?.map((child) => {
              return (
                <div className="col_item panel_item" key={child.role_id}>
                  <Checkbox disabled checked={true} />
                  <Title>{child.role_name}</Title>
                </div>
              );
            })}
          </CollapseItemWrapper>
        ),
      };
    }) || [];

  return panels;
};
