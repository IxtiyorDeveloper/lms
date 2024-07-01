export const makeData = (data: any) => {
  const initAuto = { count: "0", label: "Auto" };
  const initManual = { count: "0", label: "Manual" };
  const auto = data.filter((d: any) => d.label === "Auto")[0]
    ? data.filter((d: any) => d.label === "Auto")[0]
    : initAuto;
  const manual = data.filter((d: any) => d.label === "Manual")[0]
    ? data.filter((d: any) => d.label === "Manual")[0]
    : initManual;
  const total = { label: "Total", count: +auto.count + +manual.count };
  return [total, auto, manual];
};
