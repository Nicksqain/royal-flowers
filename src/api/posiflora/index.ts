import { AxiosResponse } from "axios";
import api from "..";
import { PosifloraProductsResponse, PosifloraStoresResponse } from "./types";
import { useQuery } from "@tanstack/react-query";

export const fetchPosifloraStores = async () =>
  api.get<any, AxiosResponse<PosifloraStoresResponse>>(`/posiflora/stores`).then((response) => response.data);

export const fetchPosifloraProducts = async (storeId: string) =>
  api.get<any, AxiosResponse<PosifloraProductsResponse>>(`/posiflora/inventory`, {
    params: { store_id: storeId }
  }).then((response) => response.data.slice(0, 20));

export const useProducts = (storeId: string) => {
  return useQuery({
    queryKey: ['products', storeId],
    queryFn: () => fetchPosifloraProducts(storeId)
  });
};