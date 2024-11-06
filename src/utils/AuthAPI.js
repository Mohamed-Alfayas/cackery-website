import axios from "axios";
import Cookies from "universal-cookie";

const { REACT_APP_BASE_URL } = process.env;
const cookies = new Cookies();

const createAxiosInstance = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type":"application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const AuthApi = createAxiosInstance(REACT_APP_BASE_URL);

const applyAccessTokenInterceptor = (apiInstance) => {
  apiInstance.interceptors.request.use(
    (req) => {
      // const {accessToken} = useContext(DataContext)
      const token = cookies.get('web_access_token');
      if (token) {
        req.headers["Authorization"] = 'Bearer ' + token; // Set Access Token
      }
      return req;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  apiInstance.interceptors.response.use(
    (req) => {
      return req;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
};

applyAccessTokenInterceptor(AuthApi);

export const signupApi = (requestData) =>
  new Promise((resolve, reject) => {
    AuthApi
      .post(`/auth/signup/`, requestData)
      .then((response) => {
        resolve({ status: "success", data: response?.data });
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

export const loginApi = (requestData) =>
  new Promise((resolve, reject) => {
    AuthApi
      .post(`/auth/login/`, requestData)
      .then((response) => {
        resolve({ status: "success", data: response?.data });
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

export const logoutApi = (requestData) =>
  new Promise((resolve, reject) => {
    AuthApi
      .post(`/auth/logout/`, requestData)
      .then((response) => {
        resolve({ status: "success", data: response?.data });
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });


export { AuthApi };
