import axios from "axios";
import { notification } from "ant-design-vue";

const http = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
});

http.interceptors.response.use(undefined, (e) => {
  notification.error({
    description: e,
  });
});
