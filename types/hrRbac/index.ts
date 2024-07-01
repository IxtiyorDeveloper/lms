export interface IHrRbacPermissions {
  allPermissions: { [p: string]: string[] };
  permissions: any[];
  vacancyList: IHrRbacVacancyList[];
  stageList: IHrRbacStageList[];
  category_config: {
    id: string;
    name: string;
    is_responsible: number;
    is_supervisor: number;
  }[];
}

export interface IHrRbacVacancyList {
  id: string;
  title?: string;
  role_id: string;
  vacancyCandidateStages: IHrRbacVacancyCandidateStage[];
}

export interface IHrRbacVacancyCandidateStage {
  id: string;
  vacancy_id: string;
  stage: string;
  is_checked: string;
}

export interface IHrRbacStageList {
  label: string;
  value: number;
}
