export function getKeysWithPermission({
  obj,
  name,
}: {
  obj: any;
  name: string;
}) {
  const permission = name.split("_").slice(2).join("_");
  const result: any = {};
  const regex = new RegExp(`^p_\\d+_${permission}$`);

  for (const key in obj) {
    if (regex.test(key)) {
      result[key] = obj[key];
    }
  }

  return Object.values(result).every((value) => value === true);
}
