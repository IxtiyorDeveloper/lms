import React, { FC } from "react";
import { Wrapper } from "./style";
import { Button, Segmented, PlusSvg } from "components";
import { useDispatch } from "react-redux";
import { toggleModal } from "store";
import { IStockLocation } from "types";
import { useRouter } from "next/router";

interface IProps {
  locations: IStockLocation[];
}
const Tabs: FC<IProps> = ({ locations }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Wrapper>
      <Segmented
        options={[
          // { value: "0", label: "All locations" },
          ...locations.map((e) => {
            return {
              value: e.id?.toString(),
              label: e.name,
            };
          }),
        ]}
        initValue={
          router.query.location_id ? router.query.location_id?.toString() : "0"
        }
        routerKey="location_id"
      />
      <Button
        style={{ whiteSpace: "nowrap", height: "37px" }}
        icon={<PlusSvg />}
        onClick={() =>
          dispatch(
            toggleModal({
              key: "stockCategory",
              data: {
                data: {},
                open: true,
              },
            }),
          )
        }
      >
        Create category
      </Button>
    </Wrapper>
  );
};

export default Tabs;
