import React, { CSSProperties, FC } from "react";
import {
  DeleteSvg,
  EditSvg,
  LocationSvg,
  MapSvg,
  RoomSvg,
  SituationSvg,
  TargetSvg,
} from "components";
import { bgColors, textColors } from "styles/theme";
import { BranchCard } from "../../style";
import { IRegion, TBranch } from "types";
import { IOpen } from "../branchModal";
import Router from "next/router";
import { Tooltip } from "antd";
interface IProps {
  e: TBranch;
  original: IRegion;
  branchHandleOpen: (id: string) => void;
  onClickSaveBranch: (data: IOpen) => void;
  style?: CSSProperties;
}
const Index: FC<IProps> = ({
  e,
  original,
  branchHandleOpen,
  onClickSaveBranch,
  style,
}: IProps) => {
  return (
    <BranchCard
      style={style}
      onClick={() =>
        Router.push(`/settings/academic-settings/rooms/${original?.id}/${e.id}`)
      }
    >
      <div className="img-side">
        <img
          src={e.coverFile?.full_url || "https://picsum.photos/300/300"}
          alt="branch"
        />
      </div>
      <div className="text-side">
        <div className="branch-head">
          <h3 className="branch-name">{e.name}</h3>
          <div className="icons">
            <EditSvg
              onClick={(event) => {
                event.stopPropagation();
                e &&
                  onClickSaveBranch({
                    isOpen: true,
                    type: "update",
                    id: +e.id,
                    regionId: +e.region_id,
                  });
              }}
              color={textColors.yourShadow}
            />
            <DeleteSvg
              onClick={(event) => {
                event.stopPropagation();
                branchHandleOpen(e.id);
              }}
              color={textColors.yourShadow}
            />
          </div>
        </div>
        <ul>
          <li>
            <div>
              <LocationSvg color={bgColors.yourShadow} />
            </div>
            <Tooltip destroyTooltipOnHide title={e.address || "-"}>
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {e.address || "-"}
              </span>
            </Tooltip>
          </li>
          <li>
            <RoomSvg color={bgColors.yourShadow} />
            <span>{e.room_count || 0}</span>
          </li>
          {/*<li>*/}
          {/*  <MapSvg color={bgColors.yourShadow} />*/}
          {/*  <span>{e.address || "-"}</span>*/}
          {/*</li>*/}
          <li>
            <SituationSvg color={bgColors.yourShadow} />
            <span>{e.landmark || "-"}</span>
          </li>
          <li>
            <TargetSvg color={bgColors.yourShadow} />
            <span>
              {e.latitude && e.longitude ? `${e.latitude},${e.longitude}` : "-"}
            </span>
          </li>
        </ul>
      </div>
    </BranchCard>
  );
};

export default Index;
