import { AxiosResponse } from "axios";
import api from "..";
import { AmoCrmPipelinesResponse } from "./types";

export const fetchAmoCrmPipelines = async () =>
  api.get<any, AxiosResponse<AmoCrmPipelinesResponse>>(`/amocrm/pipelines`).then((response) => response.data);
