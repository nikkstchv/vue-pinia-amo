import { API_DOCFLOW } from "./api";


export const getSettlements = async () => {
  return API_DOCFLOW.get('settlement-accounts').then(response => response?.data);
}

export const getSettlementById = async (id: number) => {
  return API_DOCFLOW.get(`settlement-accounts/${id}`).then(response => response?.data);
}


export const addSettlement = async (newItem: object) => {
  return API_DOCFLOW.post('settlement-accounts', { ...newItem })
    .then(response => response?.data);
}

export const updateSettlement = async (id: number, item: object) => {
  return API_DOCFLOW.put(`settlement-accounts/${id}`, {...item}).then(response => response?.data);
}

export const deleteSettlement = async (id: number) => {
  return API_DOCFLOW.delete(`settlement-accounts/${id}`).then(response => response?.data);
}