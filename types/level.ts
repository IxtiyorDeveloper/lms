export interface ILevel {
  id: string;
  company_id: string;
  course_id: string;
  parent_id: null | string;
  order: string;
  name: string;
  duration: null | string;
  children: SubLevel[];
  parent: SubLevel;
}

interface SubLevel {
  id: string;
  company_id: string;
  course_id: string;
  parent_id: string;
  order: string;
  name: string;
  duration: null | string;
}
