export const checkToday = ({ day }: { day: string }) => {
  // Define the input date
  const inputDate = new Date(day);

  // Get the current date as a formatted string
  const currentDateStr = new Date().toLocaleDateString();

  // Format the input date as a string for comparison
  const inputDateStr = inputDate.toLocaleDateString();
  return inputDateStr === currentDateStr;
};
