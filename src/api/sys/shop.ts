import { defHttp } from "/@/utils/http/axios";
import { GoodsModel } from "./model/goodsModel";

import { ResponseModel } from "./model/responseModel";

enum Api {
  Goods = "/Goods",
}

export function getGoodsList(params: { goods_seller_id?: number; goods_name?: string }) {
  return defHttp.get<ResponseModel>({
    url: Api.Goods,
    params,
  });
}

export function createGoods(params: GoodsModel) {
  return defHttp.post<ResponseModel>({
    url: Api.Goods,
    params,
  });
}

export function updateGoods(params: GoodsModel) {
  return defHttp.put<ResponseModel>({
    url: Api.Goods,
    params,
  });
}

export function deleteGoods(params: GoodsModel) {
  return defHttp.delete<ResponseModel>({
    url: Api.Goods,
    params,
  });
}
