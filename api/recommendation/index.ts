import axios from "../";
import { TParams } from "types";
import { PROJECT_LMS } from "../../constants";

export default {
    updatePreference: (params?: TParams) => {
        return axios.post("/v1", {
            project: PROJECT_LMS,
            action: "admin_student_update_preferences",
            query_params: params?.query_params,
            body: params?.body,
        });
    },
};
