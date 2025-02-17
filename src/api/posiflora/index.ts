import { AxiosResponse } from "axios";
import api from "..";
import { PosifloraStoresResponse } from "./types";

export const fetchPosifloraStores = async () =>
  api.get<any, AxiosResponse<PosifloraStoresResponse>>(`/posiflora/stores`).then((response) => response.data);
