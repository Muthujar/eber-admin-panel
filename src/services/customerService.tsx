import apiBs from "./apiBs";
import apiClient from "./apiClient";
import axios from "axios";
export const fetchCustomerList = async (params: {
  page?: number;
  limit?: number;
  display_name?: string;
}) => {
  const response = await apiClient.get("/business/list/user", { params });
  return response.data;
};

export const fetchCustomerDetails = async (query: {
  email?: string;
  phone?: string;
}) => {
  const response = await apiClient.get("/integration/user/show", {
    params: query,
  });
  return response.data;
};

export const postPurchaseDetails = async (
  body: {},query:{}
  
) => {
  const response = await apiClient.post("integration/issue_point", body,{params: query });
  return response.data;
};

export const redeemRewards = async (
  body: {},query:{}
  
) => {
  const response = await apiClient.post("integration/redeem", body,{params: query });
  return response.data;
};

export const voidTransaction = async (body:{},
  query:{}
  
) => {
  const response = await apiClient.post("integration/point_transaction/void",body,{params: query });
  return response.data;
};



export const getTransactions = async (
  params: {
    page?: number;
    limit?: number;
    display_name?: string;
  }
  
) => {
  const response = await apiClient.get("integration/point_transaction",{params});
  return response.data;
};

export const getBsCustomer = async (
  params: {
    page?: number;
    limit?: number;
    display_name?: string;
  }
  
) => {
  // const response = await apiBs.get("https://mydemov2.beautecloud.com/be/api/custappt",{params});
  const response = await apiBs.get("custappt",{params});

  return response.data;
};