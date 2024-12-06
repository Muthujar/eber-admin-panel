// import { useCustomerContext } from '../context/CustomerContext';
import {useCustomerContext} from "../context/customerContext"

export const useCustomer = () => {
  const { state, getCustomerList, getCustomerDetails,postPurchase,redeemRewardPoints, FetchTransactionList,fetchBsCustomer,voidTransac} = useCustomerContext();
  return { state, getCustomerList, getCustomerDetails,postPurchase,redeemRewardPoints,FetchTransactionList,fetchBsCustomer ,voidTransac};
};