import { IMeetingDay } from "types";
import { TimerSvg } from "components";
import { MeetingTableWrapper, TableTitle } from "./style";

const MeetingTable = ({ data }: { data?: IMeetingDay[] }) => {
  return (
    <div>
      <TableTitle>
        <TimerSvg />
        Busy
      </TableTitle>
      <MeetingTableWrapper>
        <table>
          <tr>
            <th>Time</th>
            <th>Position</th>
            <th>Candidate</th>
            <th>Stage</th>
          </tr>
          {data?.map((item, index) => {
            const candidate = item?.candidate;
            return (
              <tr key={item.time}>
                <td>{item?.time}</td>
                <td>{candidate?.currentVacancy}</td>
                <td>{candidate?.fullName}</td>
                <td>{candidate?.currentStage}</td>
              </tr>
            );
          })}
        </table>
      </MeetingTableWrapper>
    </div>
  );
};

export default MeetingTable;
