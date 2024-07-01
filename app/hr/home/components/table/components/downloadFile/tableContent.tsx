import { ICandidate, IFetchList, InitialDataHR } from "types";

const TableContent = ({
  data,
  initialData,
}: {
  data: IFetchList<ICandidate> | undefined;
  initialData: InitialDataHR | undefined;
}) => {
  const stageList = initialData?.stageList;
  return (
    <div className="file_container">
      <p>Candidates</p>
      <table className="pdf_table">
        <tr>
          <th>#</th>
          <th>Responsible</th>
          <th>Date time</th>
          <th>Position</th>
          <th>Stage</th>
          <th>Full name</th>
        </tr>
        {data?.list?.map((item, index) => {
          const stage = stageList?.find((stage) => stage.value === item.stage);
          return (
            <tr key={item.id}>
              <td className="main_index">{index + 1}</td>
              <td>{item?.meeting?.responsible?.fullName}</td>
              <td>{item?.meeting?.date}</td>
              <td>{item?.vacancy?.title}</td>
              <td>{stage?.label}</td>
              <td>
                {item?.first_name} {item?.last_name}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TableContent;
