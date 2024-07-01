import axios from "..";
import { IData, IPotentialFail, TParams } from "types";
import { PROJECT_LMS } from "../../constants";

export default {
  getPotentialFailList: (params?: TParams) =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_academic_fallible_index",
      query_params: params?.query_params,
      body: params?.body,
    }),
  adminAcademicFallibleGetByMentor: (
    params?: TParams,
  ): IData<IPotentialFail> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_academic_fallible_get_by_mentor",
      ...params,
    });
  },
};
