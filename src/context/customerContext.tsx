import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  fetchCustomerList,
  fetchCustomerDetails,
  postPurchaseDetails,
  redeemRewards,
  getTransactions,
  getBsCustomer,
  voidTransaction,
  createEberCustomer,
  getBsTransactions,
} from "../services/customerService";
import { message } from "antd";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface CustomerState {
  customers: Customer[];
  bsCustomer:[],
  transactions: [];
  Bstransactions: [];
  total: number;
  transTotal:number
  customerDetails: Customer | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  redeemData:any
}

interface CustomerAction {
  type:
    | "FETCH_LIST_START"
    | "FETCH_LIST_SUCCESS"
    | "FETCH_DETAILS_SUCCESS"
    | "POST_PURCHASE_SUCCESS"
    | "FETCH_ERROR"
    | "REDEEM_SUCCESS"
    |"VOID_SUCCESS"
    |"FETCH_TRANSACTION_SUCCESS"
    |"FETCH_BS_TRANSACTION_SUCCESS"
    |"FETCH_BS_LIST_SUCCESS"
  payload?: any;
}

const initialState: CustomerState = {
  customers: [],
  bsCustomer:[],
  total: 0,
  transTotal:0,
  customerDetails: null,
  loading: false,
  error: null,
  success: null,
  redeemData:null,
  transactions:[],
  Bstransactions:[]

};

const customerReducer = (
  state: CustomerState,
  action: CustomerAction
): CustomerState => {
  switch (action.type) {
    case "FETCH_LIST_START":
      return { ...state, loading: true, error: null };
    case "FETCH_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        customers: action.payload.data,
        total: action.payload.total,
      };
      case "FETCH_BS_LIST_SUCCESS":
        return {
          ...state,
          loading: false,
          bsCustomer: action.payload.data,
          total: action.payload.data.length,
        };
      case "FETCH_TRANSACTION_SUCCESS":
        return {
          ...state,
          loading: false,
          transactions: action.payload.data,
          transTotal: action.payload.total,
        };
        case "FETCH_BS_TRANSACTION_SUCCESS":
          console.log(action.payload)
          return {
            ...state,
            loading: false,
            Bstransactions: action.payload.dataList,
            transTotal: action.payload.meta?.pagination?.total,
          };
    case "FETCH_DETAILS_SUCCESS":
      return { ...state, loading: false, customerDetails: action.payload };
    case "POST_PURCHASE_SUCCESS":
      return { ...state, loading: false, customerDetails: action.payload };
    case "REDEEM_SUCCESS":
      return { ...state, loading: false, redeemData: action.payload };
      case "VOID_SUCCESS":
        return { ...state, loading: false, success: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const CustomerContext = createContext<any>(null);

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(customerReducer, initialState);

  const getCustomerList = async (params: {
    page?: number;
    limit?: number;
    display_name?: string;
  }) => {
    dispatch({ type: "FETCH_LIST_START" });
    try {
      const data = await fetchCustomerList(params);
      console.log(data);
      dispatch({ type: "FETCH_LIST_SUCCESS", payload: data });
    } catch (error: any) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };

  const FetchTransactionList = async (params: {
    page?: number;
    limit?: number;
    display_name?: string;
  }) => {
    dispatch({ type: "FETCH_LIST_START" });
    try {
      const data = await getTransactions(params);
      console.log(data);
      dispatch({ type: "FETCH_TRANSACTION_SUCCESS", payload: data });
    } catch (error: any) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };


  const FetchBsTransactionList = async (params: {
    // page?: number;
    // limit?: number;
    // display_name?: string;
  }) => {
    dispatch({ type: "FETCH_LIST_START" });
    try {
      const data = await getBsTransactions(params);
      console.log(data);
      dispatch({ type: "FETCH_BS_TRANSACTION_SUCCESS", payload: data.data });
    } catch (error: any) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };


  const getCustomerDetails = async (query: {
    email?: string;
    phone?: string;
  }) => {
    dispatch({ type: "FETCH_LIST_START" });
    try {
      const data = await fetchCustomerDetails(query);
      if (data && data.statusCode === 400)
        dispatch({
          type: "FETCH_ERROR",
          payload: data.errorDetails.error.exception[0],
        });
      else {
        dispatch({ type: "FETCH_DETAILS_SUCCESS", payload: data });
        console.log(data, "d");
      }
    } catch (error: any) {
      console.log(error, "e");

      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };

  const postPurchase = async (
    body: {},
    params: {
      phone: number;
      page?: number;
      limit?: number;
    }
  ) => {
    dispatch({ type: "FETCH_LIST_START" });
    try {
      const data = await postPurchaseDetails(body, params);
      console.log(data);

      dispatch({ type: "POST_PURCHASE_SUCCESS", payload: data });
      return data

    } catch (error: any) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };

  const redeemRewardPoints = async (
    body: {},
    params: {
      phone: number;
      page?: number;
      limit?: number;
    }
  ) => {
    dispatch({ type: "FETCH_LIST_START" });
    try {
      const data = await redeemRewards(body, params);
      console.log(data);
      dispatch({ type: "REDEEM_SUCCESS", payload: data });
      return data
    } catch (error: any) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };

  const voidTransac = async (
    body: {},
    params: {
      phone: number;
      page?: number;
      limit?: number;
    }
  ) => {
    dispatch({ type: "FETCH_LIST_START" });
    try {
      const data = await voidTransaction({},params);
      console.log(data);
      dispatch({ type: "VOID_SUCCESS", payload: data });
      return data
    } catch (error: any) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };

  const fetchBsCustomer = async (
    params:{}
  ) => {
    dispatch({ type: "FETCH_LIST_START" });
    try {
    const data = await getBsCustomer(params);
      console.log(data);
      dispatch({ type: "FETCH_BS_LIST_SUCCESS", payload: data });
      return data
    } catch (error: any) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };


  const createEberAcc = async (
    body:{}
  ) => {
    dispatch({ type: "FETCH_LIST_START" });
    try {
    const data = await createEberCustomer(body);
      console.log(data);
      dispatch({ type: "FETCH_BS_LIST_SUCCESS", payload: data });
      return data
    } catch (error: any) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };


  return (
    <CustomerContext.Provider
      value={{ state, voidTransac,getCustomerList, getCustomerDetails, postPurchase,redeemRewardPoints,FetchTransactionList,fetchBsCustomer,createEberAcc,FetchBsTransactionList }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => {
  return useContext(CustomerContext);
};
