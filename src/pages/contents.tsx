import React, { useEffect } from "react";
import { Tabs } from "antd";
import { VoidPoints } from "./voidPoints";
import Transactions from "./transactions";
import CustomerList from "./customerList";
import { deleteCookie } from "../services/utils";
import { useCustomer } from "../hooks/useCustomer";
import RedemptionForm from "./redeem";

function Contents() {
  const { state, changeTab } = useCustomer();
  const { tab } = state; // Extract tab state from global state
  console.log(tab);

  useEffect(()=>{
console.log(tab)


  },[tab])

  const logout = () => {
    deleteCookie("Token");
    window.location.reload(); // Reload the app to clear the session
  };

  return (
    <div className="px-4">
      <div>
        {/* Tabs for navigation */}
        <Tabs
          activeKey={tab}
          onChange={(key) => {
            if (key === "5") {
              logout(); // Handle logout directly
            } else {
              changeTab(key); // Change tab state
            }
          }}
        >
          <Tabs.TabPane tab="Customer Details" key="1" />
          <Tabs.TabPane tab="Redeem" key="2" />
          <Tabs.TabPane tab="Void Points" key="3" />
          <Tabs.TabPane tab="Transactions" key="4" />
          <Tabs.TabPane tab="Logout" key="5" />
        </Tabs>

        {/* Content switching based on active tab */}
        <div className="mt-4">
          {tab === "1" && <CustomerList />}
          {tab === "2" && <RedemptionForm />}
          {tab === "3" && <VoidPoints />}
          {tab === "4" && <Transactions />}
        </div>
      </div>
    </div>
  );
}

export default Contents;
