import { ILevel } from "../teacher";

export interface ISearchOneArs {
  user_id: number;
  first_name: string;
  last_name: string;
  current_unit_id: number;
  current_activity: IArsCurrentActivity;
  points: number;
  coins: number;
  level: ILevel;
  avatar: string;
  language: string;
  intro_watched: boolean;
  avatar_uploaded: boolean;
}

export interface IArsCurrentActivity {
  id: number;
  name: string;
}
