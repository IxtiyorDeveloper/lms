import { IGroup, IRanking } from "types";

export interface IRankingCard {
  rankingData: IRanking | undefined;
  groups: IGroup[] | undefined;
}
