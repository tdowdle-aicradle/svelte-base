import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosPromise
  } from "axios";
  
  const ORIGIN =
    process.env.isProd
      ? window.location.origin
      : "http://localhost:3000";
  const TARGET =
    process.env.isProd
      ? `/${process.env.targetEnv}`
      : "";
  
  export const APIENDPOINT: string = `${ORIGIN}${TARGET}`;  // eslint-disable-line
  const CACHE_BUST_PARAM = "_ie_cache_bust";
  
  export let axiosInstance: AxiosInstance;
  
  const ApiService = {
    init() {
      axiosInstance = axios.create({ baseURL: APIENDPOINT });
      axiosInstance.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
          "accessToken"
        )}`;
        return config;
      });
    },
    get(resource: string, config?: AxiosRequestConfig) {
      return axiosInstance.get(resource, config);
    },
    post(resource: string, data = {}, config?: AxiosRequestConfig) {
      return axiosInstance.post(resource, data, config);
    },
    put(resource: string, data = {}, config?: AxiosRequestConfig) {
      return axiosInstance.put(resource, data, config);
    },
    delete(resource: string, config?: AxiosRequestConfig) {
      return axiosInstance.delete(resource, config);
    }
  };
  
  export const userService = {
    logout(): AxiosPromise<any> {
        console.log(axiosInstance);
      return axiosInstance.get("/auth/logout");
    }
  };
  
  export function post(endPoint: string, data: any) {
    return axios.post(`${APIENDPOINT}/${endPoint}`, data);
  }
  
  export function getEndPoint(endPoint: string) {
    return axios
      .get(`${APIENDPOINT}/${endPoint}`, {
        headers: {
          authentication: "Bearer " + localStorage.getItem("accessToken")
        }
      })
      .then(r => {
        if (r.status === 200) {
          return r.data;
        } else {
          throw Error(`Error getting endpoint responded with ${r}`);
        }
      });
  }
  
  export function initiateSocketConnection(webSocketRef: string) {
    return new WebSocket(webSocketRef);
  }
  
  export default ApiService;
  