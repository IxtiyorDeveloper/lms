export default function formatPhoneNumber(a: string) {
  a = a && a.replace(/^\+/, "");
  if (a?.length === 12) {
    return `(${a[3] + a[4]}) ${a.slice(5, 8)} ${a.slice(8, 10)} ${a.slice(10, 12)}`;
  }
  if (a?.length === 9) {
    return `(${a[0] + a[1]}) ${a.slice(2, 5)} ${a.slice(5, 7)} ${a.slice(7, 9)}`;
  }
  return "-";
}
export function formatIpPhone(a: string) {
  a = a.replace(/^\+/, "");
  return a?.length === 12 ? a.slice(3) : a;
}

export const separatePhoneNumber = (phone: string | number) => {
  if (!phone) return;
  const slicedPhone = phone.toString().slice(4);
  const res = `+998 (${slicedPhone.slice(0, 2)}) ${slicedPhone.slice(
    2,
    5
  )} ${slicedPhone.slice(5, 7)} ${slicedPhone.slice(7, 9)}`;

  return res;
};
