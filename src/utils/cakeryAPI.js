import axios from "axios";
// import { useContext } from "react";
// import { DataContext } from "../context/DataContext";
import Cookies from "universal-cookie";

const { REACT_APP_BASE_URL } = process.env;
const cookies = new Cookies();

const createAxiosInstance = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + cookies.get("web_access_token"),
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const cakeryAPI = createAxiosInstance(REACT_APP_BASE_URL);

const applyAccessTokenInterceptor = (apiInstance) => {
  apiInstance.interceptors.request.use(
    (req) => {
      // const {accessToken} = useContext(DataContext)
      const token = cookies.get("web_access_token");
      if (token) {
        req.headers["Authorization"] = "Bearer " + token; // Set Access Token
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

applyAccessTokenInterceptor(cakeryAPI);

export const getOverallCakeMenuList = (requestData) =>
  new Promise((resolve, reject) => {
    cakeryAPI
      .get(`/cake/get-cake-data/`, { params: requestData })
      .then((response) => {
        resolve({ status: "success", data: response.data?.data });
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

export const getSubCategoryListApi = (requestData) =>
  new Promise((resolve, reject) => {
    cakeryAPI
      .get(`/category/sub-category`, { params: requestData })
      .then((response) => {
        resolve({ status: "success", data: response.data?.data });
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

export const getGalleryListApi = (requestData) =>
  new Promise((resolve, reject) => {
    cakeryAPI
      .get(`/gallery/get-gallery`, { params: requestData })
      .then((response) => {
        resolve({ status: "success", data: response.data?.data });
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

export const getMenuApi = (id, requestData) =>
  new Promise((resolve, reject) => {
    cakeryAPI
      .get(`/cake/cake/${id}`, { params: requestData })
      .then((response) => {
        resolve({ status: "success", data: response.data?.data });
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

export const getProfileApi = (requestData) =>
  new Promise((resolve, reject) => {
    cakeryAPI
      .get(`/customer/get-my-profile`, { params: requestData })
      .then((response) => {
        resolve({ status: "success", data: response.data?.data });
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

export const updateProfileApi = (requestData) =>
  new Promise((resolve, reject) => {
    cakeryAPI
      .post(`/customer/update-profile/`, requestData)
      .then((response) => {
        resolve({ status: "success", data: response.data?.data });
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

export const getCartApi = (requestData) =>
  new Promise((resolve, reject) => {
    cakeryAPI
      .get(`/cart/get`, { params: requestData })
      .then((response) => {
        resolve({ status: "success", data: response.data?.data });
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

export const addToCartApi = (requestData) =>
  new Promise((resolve, reject) => {
    cakeryAPI
      .post(`/cart/create/`, requestData)
      .then((response) => {
        resolve({ status: "success", data: response.data?.data });
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

export const removeCartApi = (id, requestData) =>
  new Promise((resolve, reject) => {
    cakeryAPI
      .delete(`/cart/delete-cart/${id}`, requestData)
      .then((response) => {
        resolve({ status: "success", data: response.data?.data });
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

export const getAddressApi = (requestData) =>
  new Promise((resolve, reject) => {
    cakeryAPI
      .get(`/customer/get-address/`, { params: requestData })
      .then((response) => {
        resolve({ status: "success", data: response.data?.data });
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

export const createAddressApi = (requestData) =>
  new Promise((resolve, reject) => {
    cakeryAPI
      .post(`/customer/save-address/`, requestData)
      .then((response) => {
        resolve({ status: "success", data: response.data?.data });
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

export const getOrderApi = (requestData) =>
  new Promise((resolve, reject) => {
    cakeryAPI
      .get(`/order/get-my-orders/`, { params: requestData })
      .then((response) => {
        resolve({ status: "success", data: response.data?.data });
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

export const updateOrderApi = (requestData) =>
  new Promise((resolve, reject) => {
    cakeryAPI
      .post(`/order/save/`, requestData)
      .then((response) => {
        resolve({ status: "success", data: response.data?.data });
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

export const contactApi = (requestData) =>
  new Promise((resolve, reject) => {
    cakeryAPI
      .post(`/testimonial/feedback-message`, requestData)
      .then((response) => {
        resolve({ status: "success", data: response.data?.data });
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

export const getOfferItemsApi = (requestData) =>
  new Promise((resolve, reject) => {
    cakeryAPI
      .get(`/cake/offer-items`, { params: requestData })
      .then((response) => {
        resolve({ status: "success", data: response.data?.data });
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

export const getConfiguration = (requestData) =>
  new Promise((resolve, reject) => {
    cakeryAPI
      .get(`/configuration/settings`, { params: requestData })
      .then((response) => {
        resolve({ status: "success", data: response.data?.data });
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

export const orderCancelRequest = (requestData) =>
  new Promise((resolve, reject) => {
    cakeryAPI
      .post(`/order/status-update/`, requestData)
      .then((response) => {
        resolve({ status: "success", data: response.data?.data });
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

  export const getTermsAndConditions =(requestData) =>
    new Promise((resolve,reject) => {
      cakeryAPI
      .get(`/configuration/terms-and-conditions/`, { params: requestData })
      .then((response) => {
        console.log(response?.data)
        resolve({ status: "success", data: response?.data})
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

  export const getPrivacyAndPolicy =(requestData) =>
    new Promise((resolve,reject) => {
      cakeryAPI
      .get(`/configuration/privacy-policy/`, { params: requestData })
      .then((response) => {
        console.log(response?.data)
        resolve({ status: "success", data: response?.data})
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });

export { cakeryAPI };
