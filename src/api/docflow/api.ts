import axios from "axios";
import { useInitializationStore } from "@/stores/initializationStore";


export const API_DOCFLOW = axios.create({
  baseURL: "http://localhost:3003/",
  validateStatus(status) {
    return status >= 200 && status < 300;
  },
});

API_DOCFLOW.interceptors.request.use((req: any) => {
  req.headers["X-Account-Id"] = useInitializationStore().extAccountId || '30413944';
  req.headers["X-Platform-Id"] = "1";
  req.headers["X-Auth-Token"] = useInitializationStore().token || "";
  return req;
});
