import { defHttp } from "/@/utils/http/axios";
import { DatasetModel } from "./model/datasetModel";

import { ResponseModel } from "./model/responseModel";

enum Api {
  Dataset = "/dataset",
}

export function getDatasetList(params: DatasetModel) {
  return defHttp.get<ResponseModel & { result: DatasetModel[] }>({
    url: Api.Dataset,
    params,
  });
}

export function createDataset(params: DatasetModel) {
  return defHttp.post<ResponseModel>({
    url: Api.Dataset,
    params,
  });
}

export function deleteDataset(params: DatasetModel) {
  return defHttp.delete<ResponseModel>({
    url: Api.Dataset,
    params,
  });
}
