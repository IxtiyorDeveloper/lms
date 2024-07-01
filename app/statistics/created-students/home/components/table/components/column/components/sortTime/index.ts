export function sortTimes(times: string[]) {
  const customSort = (a: string, b: string) => {
    const timeA = new Date("1970-01-01T" + a + "Z").getMilliseconds();
    const timeB = new Date("1970-01-01T" + b + "Z").getMilliseconds();
    return timeA - timeB;
  };

  return times?.slice()?.sort(customSort);
}
