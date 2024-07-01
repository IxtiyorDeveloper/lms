import React, {FC} from 'react';
import Filter from "./filters";
import Table from "./table";

const Debter: FC = () => {
    return (
        <div>
            <Filter/>
            <Table/>
        </div>
    )
}

export default Debter;