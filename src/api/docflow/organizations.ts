import { API_DOCFLOW } from "./api";


export const getOrganizations = async () => {
  return API_DOCFLOW.get('organizations').then(response => response?.data);
}

export const getOrganizationById = async (id: number) => {
  return API_DOCFLOW.get(`organizations/${id}`).then(response => response?.data);
}

export const updateOrganization = async (id: number, name: string) => {
  return API_DOCFLOW.put(`organizations/${id}`, {
    name: name
  }).then(response => response?.data);
}