import { EObservationStaff, IRankingObservation } from "types/observation";

export interface Type {
  observations: IRankingObservation[] | undefined;
  isLoading: boolean;
  type?: EObservationStaff;
}
