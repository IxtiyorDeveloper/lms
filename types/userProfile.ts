export interface IUserProfile {
  user_id: number;
  firstname: string;
  middlename: null | string;
  lastname: string;
  fullName: string;
  locale: string;
  gender: null | string;
  description: null | string;
  bio: null | string;
  dob: null | string;
  age: number;
  avatar: {
    id: string;
    full_url: string;
    children: { full_url: string; resolution: string }[];
  };
}
