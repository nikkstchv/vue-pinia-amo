import { API_DOCFLOW } from "./api";


export const getDocuments = async () => {
  return API_DOCFLOW.get('document').then(response => response?.data);
}

export const getPaginatedDocuments = async (page: number, limit: number, search: string) => {
  return API_DOCFLOW.get(
    `document/paginated?page=${page}&limit=${limit}&search=${search}`
  ).then((response) => {
    // console.log(
    //   "%cdocument.ts line:12 object",
    //   "color: #007acc;",
    //   response?.data
    // );
    return response?.data;
  });
};


export const getDocumentById = async (id: number) => {
  return API_DOCFLOW.get(`document/${id}`).then(response => response?.data);
}


export const addDocument = async (newItem: object) => {
  return API_DOCFLOW.post('document', { ...newItem })
    .then(response => response?.data);
}

export const updateDocument = async (id: number, item: object) => {
  return API_DOCFLOW.put(`document/${id}`, {...item}).then(response => response?.data);
}

export const deleteDocument = async (id: number) => {
  return API_DOCFLOW.delete(`document/${id}`).then(response => response?.data);
}