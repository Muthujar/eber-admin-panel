// import { useCustomerContext } from '../context/CustomerContext';
import {useCustomerContext} from "../context/customerContext"

export const useCustomer = () => {
  const { state,adjustPoints, resetState,changeTab,getCustomerList, getCustomerDetails,postPurchase,redeemRewardPoints, FetchTransactionList,fetchBsCustomer,voidTransac,createEberAcc,FetchBsTransactionList} = useCustomerContext();
  return { state,adjustPoints,resetState,changeTab, getCustomerList, getCustomerDetails,postPurchase,redeemRewardPoints,FetchTransactionList,fetchBsCustomer ,voidTransac,createEberAcc,FetchBsTransactionList};
};