import React, { FC } from "react";
import { Item, Wrapper } from "./style";
import Image from "next/image";
import { IRanking } from "types";
import { CircleImage } from "components";
import { Tooltip } from "antd";
import { useRouter } from "next/router";

const images = {
  "0": "/ranking/2.png",
  "1": "/ranking/1.png",
  "2": "/ranking/3.png",
};

interface IProps {
  data: (IRanking | undefined)[];
}

const TopTeachers: FC<IProps> = ({ data }) => {
  const router = useRouter();
  return (
    <Wrapper>
      <div className="teachers">
        {data.map((e, index) => {
          return (
            <Item
              className="item"
              image={e?.mentor?.userProfile?.avatar?.full_url || ""}
            >
              <div className="img-c">
                <CircleImage
                  width="85px"
                  height="85px"
                  src={e?.mentor?.userProfile?.avatar?.full_url}
                />
              </div>
              <div className="ranking">
                <Image
                  src={images[`${index}` as keyof typeof images]}
                  alt="r"
                  width={30}
                  height={30}
                  draggable={false}
                />
              </div>
              <Tooltip
                title={e?.mentor?.userProfile?.fullName}
                placement="bottom"
                destroyTooltipOnHide
              >
                <p>{e?.mentor?.userProfile?.fullName}</p>
              </Tooltip>
            </Item>
          );
        })}
      </div>
      <div className="btn">
        {router.query.type !== "200" ? "Top Teachers" : "Top Supports"}
      </div>
    </Wrapper>
  );
};

export default TopTeachers;
