export function checkFieldValue({ str }: { str: string }) {
  const regex = /^p_\d+_.+$/; // Regular expression pattern
  return regex.test(str);
}
