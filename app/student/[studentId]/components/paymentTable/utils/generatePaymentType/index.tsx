import { Flex } from "./style";

export const generatePaymentType = ({
  selects,
  value,
  record,
}: {
  selects: any;
  value: any;
  record: any;
}) => {
  const system = record?.details?.system;
  return (
    <Flex>
      <p className="text">{value}</p>
      {system && <img src={system?.image_url} alt={system?.Name} height={30} />}
    </Flex>
  );
};
