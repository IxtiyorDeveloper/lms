import moment from 'moment';

export const getUserExperience = (hired_date: string): number => {
  const currentDate = moment();
  const hiredDate = moment(hired_date, 'YYYY-MM-DD');

  return currentDate.diff(hiredDate, 'years');
}
