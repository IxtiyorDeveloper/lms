export const formatAttributeName = (attribute: string) => {
  return (
    attribute.charAt(0).toUpperCase() +
    attribute.slice(1).replace(/_/g, " ").toLowerCase().replace("id", "")
  );
};

export const formatAttributeValue = (value: string) => {
  return `<span title='${value}'>${value}</span>`;
};

export const formatChangedAttribute = ({
  itemChild,
  value,
}: {
  itemChild: string;
  value: string;
}) => {
  const attributeName = formatAttributeName(itemChild);
  const formatvaluetedValue = formatAttributeValue(value);
  return `<span><b>${attributeName}</b> : ${formatvaluetedValue}`;
};
