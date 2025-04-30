import api from "@/api";
import { AxiosResponse } from "axios";
import { CreateOrderParams } from "./types";

export const createOrder = async (params: CreateOrderParams) => {
  const formData = new FormData();

  formData.append("amocrm_id", params.amocrm_id.toString());
  formData.append("bouquets", JSON.stringify(params.bouquets));

  if (params.files && params.files.length > 0) {
    params.files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
  }

  const response = await api
    .post<FormData, AxiosResponse<any>>("/orders/builder/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  return response.data;
};