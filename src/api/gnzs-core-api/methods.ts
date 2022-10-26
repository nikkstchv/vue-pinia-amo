import { API_CORE } from "./api";

//types
import type { AccountDataDto, DecodeTokenDto, DNAInfoDto } from "@/types/initialization.types";
import type { Jwt } from "@/types/iframe.types";

 export const getDevJwtToken = async (xApiToken: number, widgetId: number, accountId: number, userId: any = null, data: any = null): Promise<any> => {
  const params = { account_id: accountId, user_id: userId, data };
  const headers = { "X-Api-Token": xApiToken };
  return API_CORE.get(`public/jwt/encode/${widgetId}`, { headers, params }).then(response => response?.data);
};

export const getJwtToOtherWidget = async (otherWidgetId: number): Promise<Jwt> => {
  const headers = {
    "Content-Type": "application/json",
  };
  return API_CORE.get(`public/jwt/${otherWidgetId}`, { headers }).then(response => response?.data);
};

export const verifyAndDecodeToken = async (widgetId: number): Promise<DecodeTokenDto> => {
  return API_CORE.get(`/public/jwt/verify/${widgetId}`).then(response => response?.data);
};

export const getAccountInfo = async (force = 0): Promise<AccountDataDto> => {
  return API_CORE.get(`/amo/account/info?force=${force}`).then(response => response?.data);
};

export const getDNAInfo = async (): Promise<DNAInfoDto> => {
  return API_CORE.get(`/public/account/dna`).then(response => response?.data?.account);
};