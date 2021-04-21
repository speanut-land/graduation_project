import { defHttp } from "/@/utils/http/axios";
import { LoginParams, UserModel } from "./model/userModel";

import { ResponseModel } from "./model/responseModel";

enum Api {
  UserLogin = "/user/login",
  User = "/user",
  GetPermCodeByUserId = "/getPermCodeByUserId",
}

export function loginApi(params: LoginParams) {
  return defHttp.post<ResponseModel & { token: string; userInfo: UserModel }>({
    url: Api.UserLogin,
    params,
  });
}

export function createUser(params: UserModel) {
  return defHttp.post<ResponseModel>({
    url: Api.User,
    params,
  });
}

export function updateUser(data: UserModel) {
  return defHttp.put<ResponseModel>({
    url: Api.User,
    data,
  });
}

export function getPermCodeByUserId(params: any) {
  return defHttp.get<string[]>({
    url: Api.GetPermCodeByUserId,
    params,
  });
}
