export const makeData = (data: any) => {
  const initAuto = { count: "0", label: "Incall" };
  const initManual = { count: "0", label: "Outcall" };

  const auto = data.filter((d: any) => d.label === "Incall")[0]
    ? data.filter((d: any) => d.label === "Incall")[0]
    : initAuto;

  const manual = data.filter((d: any) => d.label === "Outcall")[0]
    ? data.filter((d: any) => d.label === "Outcall")[0]
    : initManual;

  const total = { label: "Total", count: +auto.count + +manual.count };
  return [total, auto, manual];
};
