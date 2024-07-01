export interface TCreateStudent {
  first_name?: string;
  last_name?: string;
  dob?: string;
  gender?: string;
  language?: string;
  source?: string;
  course_id?: number;
  group_type_id?: number;
  level_id?: number;
  sub_level_id?: string;
  branch_id?: number;
  day?: string;
  time?: string;
  note?: string;
  phones?: {
    phone_number?: string;
    type?: string;
    is_confirmed?: boolean;
    confirmation_id?: number;
    is_active?: boolean;
    is_finished?: boolean;
    date?: Date;
    sms?: boolean;
    time?: number;
  }[];
  source_id?: number;
  is_ban?: number;
  avtar_file_id?: number;
  prefer_time?: {
    day_id?: number;
    time_id?: number;
  }[];
  index?: number;
}
