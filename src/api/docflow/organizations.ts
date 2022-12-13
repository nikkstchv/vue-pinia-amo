import { API_DOCFLOW } from "./api";


export const getOrganizations = async () => {
  return API_DOCFLOW.get('organizations').then(response => response?.data);
}

export const getOrganizationById = async (id: number) => {
  return API_DOCFLOW.get(`organizations/${id}`).then(response => response?.data);
}


export const addOrganization = async (newItem: object) => {
  return API_DOCFLOW.post('organizations', { ...newItem })
    .then(response => response?.data);
}

export const updateOrganization = async (id: number, item: object) => {
  return API_DOCFLOW.put(`organizations/${id}`, { ...item }).then(response => response?.data);
}

export const deleteOrganization = async (id: number) => {
  return API_DOCFLOW.delete(`organizations/${id}`).then(response => response?.data);
} 