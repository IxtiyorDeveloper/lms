import { Wrapper } from "./style";
import Filter from "./components/filter";
import { Spin } from "antd";
import WaitingList from "./components/waitingList";

const WaitingListStatistics = () => {
  return (
    <Spin spinning={false}>
      <Wrapper>
        <Filter />
        <WaitingList />
      </Wrapper>
    </Spin>
  );
};

export default WaitingListStatistics;
