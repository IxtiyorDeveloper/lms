import { TestTransfer } from "app";
import withAuth from "utils/guard";

function Transfer() {
  return (
    <div className="mx-40">
      <TestTransfer />
    </div>
  );
}

export default withAuth(Transfer);
