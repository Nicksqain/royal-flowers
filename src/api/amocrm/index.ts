import { AxiosResponse } from "axios";
import api from "..";
import { AmoCrmLeadsResponse, AmoCrmPipelinesResponse } from "./types";
import { useQuery } from "@tanstack/react-query";

export const fetchAmoCrmPipelines = async () =>
  api.get<any, AxiosResponse<AmoCrmPipelinesResponse>>(`/amocrm/pipelines`).then((response) => response.data);

export const fetchAmoCrmStatuses = async ({ pipelineId }: { pipelineId?: number }) =>
  api.get<any, AxiosResponse<AmoCrmPipelinesResponse>>(`/amocrm/pipelines/${pipelineId}/statuses`).then((response) => response.data);

export const fetchAmoCrmLeads = async ({ pipelineId, statusId }: { pipelineId?: number, statusId: number }) =>
  api.get<any, AxiosResponse<AmoCrmLeadsResponse>>(`/amocrm/leads`, {
    params: {
      "filter[pipeline_id]": pipelineId ?? undefined,
      "filter[status]": statusId ?? undefined,
      "order[updated_at]": "desc",
    },
  }).then((response) => response.data);

export const useAmoCrmPipelines = () => {
  return useQuery({ queryKey: ["amoCrmPipelines"], queryFn: fetchAmoCrmPipelines });
}

export const useAmoCrmStatuses = ({ pipelineId }: { pipelineId?: number }) => {
  return useQuery({ queryKey: ["amoCrmStatuses"], queryFn: () => fetchAmoCrmStatuses({ pipelineId }) });
}

export const useAmoCrmLeads = ({ pipelineId, statusId }: { pipelineId?: number, statusId: number }) => {
  return useQuery({ queryKey: ["amoCrmLeads", pipelineId, statusId], queryFn: () => fetchAmoCrmLeads({ pipelineId, statusId }) });
};