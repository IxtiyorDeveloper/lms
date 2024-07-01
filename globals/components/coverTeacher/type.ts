import { IFormDataCover } from "types/finance/salary";

export interface ICoverTeacher {
  date?: string;
  user_id?: number | string;
  amount?: number;
  group_id?: undefined | string[];
  has_main_teacher_money_operation?: boolean;
  teachers?: {
    user_id?: number | string;
    amount?: number;
    group_id?: string[];
    has_cover_teacher_money_operation?: boolean;
    description?: { [key: string]: string | undefined };
    main_description?: { [key: string]: string | undefined };
  }[];
}

export interface IRestructured {
  assignment_id: number;
  covers: IFormDataCover[];
}

export interface IValue {
  date?: string | undefined;
  user_id?: string | number | undefined;
  amount?: number | undefined;
  group_id?: (string | undefined)[] | undefined;
  has_main_teacher_money_operation?: boolean;
  teachers?:
    | (
        | {
            user_id?: string | number | undefined;
            amount?: number | undefined;
            group_id?: (string | undefined)[] | undefined;
            has_cover_teacher_money_operation?: boolean | undefined;
            description?: {} | undefined;
          }
        | undefined
      )[]
    | undefined;
}
